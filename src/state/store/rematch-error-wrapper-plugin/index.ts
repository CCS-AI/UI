// @ts-nocheck
import { ExtractRematchDispatchersFromEffects, Model, Models, Plugin } from '@rematch/core';

export interface ErrorWrapperConfig {
    name?: string;
    whitelist?: string[];
    blacklist?: string[];
}

export interface ErrorWrapperState<M extends Models> {
    error: {
        effects: {
            [modelName in keyof M]: {
                [effectName in keyof ExtractRematchDispatchersFromEffects<M[modelName]['effects']>]: boolean;
            };
        };
    };
}

const initialState = {
    effects: {}
};

const createErrorAction = (setMode) => (state, { name, action, errMessage }: any) => {
    initialState.effects[name][action] = setMode ? errMessage : null;

    return {
        ...state,
        effects: {
            ...state.effects,
            [name]: {
                ...state.effects[name],
                [action]: setMode ? errMessage : null
            }
        }
    };
};

const validateConfig = (config) => {
    if (config.name && typeof config.name !== 'string') {
        throw new Error('error wrapper plugin config name must be a string');
    }
    if (config.whitelist && !Array.isArray(config.whitelist)) {
        throw new Error('error wrapper plugin config whitelist must be an array of strings');
    }
    if (config.blacklist && !Array.isArray(config.blacklist)) {
        throw new Error('error wrapper plugin config blacklist must be an array of strings');
    }
    if (config.whitelist && config.blacklist) {
        throw new Error('error wrapper plugin config cannot have both a whitelist & a blacklist');
    }
};

export default (config: ErrorWrapperConfig = {}): Plugin => {
    validateConfig(config);

    const errorModelName = config.name || 'error';

    const error: Model = {
        name: errorModelName,
        reducers: {
            hide: createErrorAction(false),
            show: createErrorAction(true)
        },
        state: {
            ...initialState
        }
    };

    return {
        config: {
            models: {
                error
            }
        },
        onModel({ name }: Model) {
            // do not run dispatch on "error" model
            if (name === errorModelName) {
                return;
            }

            error.state.effects[name] = {};
            const modelActions = this.dispatch[name];

            // map over effects within models
            Object.keys(modelActions).forEach((action: string) => {
                if (this.dispatch[name][action].isEffect !== true) {
                    return;
                }

                const actionType = `${name}/${action}`;

                // ignore items not in whitelist
                if (config.whitelist && !config.whitelist.includes(actionType)) {
                    return;
                }

                // ignore items in blacklist
                if (config.blacklist && config.blacklist.includes(actionType)) {
                    return;
                }

                // copy orig effect pointer
                const origEffect = this.dispatch[name][action];

                // create function with pre & post error calls
                const effectWrapper = async (...props) => {
                    try {
                        // Hide just in case the error was set in the previous effect
                        this.dispatch.error.hide({ name, action });
                        const effectResult = await origEffect(...props);
                        return effectResult;
                    } catch (errMessage) {
                        if (typeof errMessage === 'string' && errMessage.indexOf('jwt expired') !== -1) {
                            // token is expired , dispatch logout.
                            this.dispatch.authentication.logout();
                        }
                        this.dispatch.error.show({
                            name,
                            action,
                            errMessage: errMessage.message
                        });
                        // this.dispatch.loadingNotify.setLoadingState({ visible: false });
                    }
                };

                effectWrapper.isEffect = true;

                // replace existing effect with new wrapper
                this.dispatch[name][action] = effectWrapper;
            });
        }
    };
};
