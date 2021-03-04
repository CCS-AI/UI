import Authentication from '../../../authentication/authentication';
import { ModelConfig } from '@rematch/core';
import { PagesRoutes } from '../../../routing/PagesRoutes';
import { localSDK as client } from '../../../sdk';

export type authenticationStateType = {
    token: string | null;
    error: string;
};

type LoginPayload = {
    username: string;
    password: string;
    recaptchaToken?: string;
};

export const authentication: ModelConfig<authenticationStateType> = {
    state: {
        token: null,
        error: ''
    },
    reducers: {
        setUserToken(state: authenticationStateType, token: string): authenticationStateType {
            return { ...state, token };
        },
        setLoginError(state: authenticationStateType, error: string): authenticationStateType {
            return { ...state, error };
        },
        logoutReducer(state: authenticationStateType): authenticationStateType {
            return { ...state, token: null };
        }
    },
    effects: (dispatch: any) => ({
        async loginAsync({ username, password, recaptchaToken }: LoginPayload) {
            const loginResponse = await Authentication.Authenticate(username, password, recaptchaToken);
            const { token, shouldResetPasswordToken } = loginResponse;
            if (token) {
                dispatch.authentication.setUserToken(token);
            } else if (shouldResetPasswordToken) {
                window.location.href = `/login/forgotPassword/${shouldResetPasswordToken}`;
            }
        },
        async refreshToken() {
            const userToken = await client.auth().refreshToken();
            dispatch.authentication.setUserToken(userToken);
        },
        async logout() {
            await client.auth().logout();
            window.location.href = PagesRoutes.Login;
        },
        async forgotPassword(email: string) {
            await Authentication.ForgotPassword(email);
            return 'Email has been sent';
        },
        async resetPassword({ token, password, passwordConfirm }: { token: string; password: string; passwordConfirm: string }) {
            await Authentication.ResetPassword(token, password, passwordConfirm);
        },
        async isResetPasswordTokenValid(token: string) {
            const isTokenValid = await Authentication.IsResetPasswordTokenValid(token);
            return isTokenValid;
        }
    })
};
