import { init, RematchRootState, ModelEffects } from '@rematch/core';
import { models, RootModel } from '../ducks';
import createLoadingPlugin from '@rematch/loading';
import errorWrapperPlugin from './rematch-error-wrapper-plugin';

const loadingPlugin = createLoadingPlugin({ asNumber: true });

const store = init({
    plugins: [loadingPlugin, errorWrapperPlugin()],
    models
});

export const { dispatch } = store;

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;

type ExtractRematchLoadingStateFromEffectsObject<effects extends ModelEffects<any>> = {
    [effectKey in keyof effects]: boolean;
};
type ExtractRematchErrorStateFromEffectsObject<effects extends ModelEffects<any>> = {
    [effectKey in keyof effects]: string;
};

interface LoadingState<M extends RootModel> {
    loading: {
        global: boolean;
        models: { [k in keyof M]: boolean };
        effects: { [k in keyof M]: ExtractRematchLoadingStateFromEffectsObject<ModelEffects<any>> };
    };
}

interface ErrorState<M extends RootModel> {
    error: {
        effects: { [k in keyof M]: ExtractRematchErrorStateFromEffectsObject<ModelEffects<any>> };
    };
}

export type RootState = RematchRootState<typeof models> & LoadingState<typeof models> & ErrorState<typeof models>;

export default store;
