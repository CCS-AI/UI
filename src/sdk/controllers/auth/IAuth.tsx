import { loginResponse } from './auth';

export default interface IAuth {
    login: (email: string, password: string, recaptchaToken: string) => Promise<loginResponse>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<string>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string, passwordConfirm: string) => Promise<void>;
    isResetPasswordTokenValid: (token: string) => Promise<boolean>;
}
