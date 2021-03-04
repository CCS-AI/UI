import BaseController from '..';
import IAuth from './IAuth';

export type loginResponse = {
    shouldResetPasswordToken: string;
    token: string;
};
export default class Auth extends BaseController implements IAuth {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async login(email: string, password: string, recaptchaToken?: string) {
        const response: loginResponse = await this.client.post('/auth', JSON.stringify({ email, password, recaptchaToken }));
        return response;
    }

    async refreshToken() {
        const response = await this.client.get('/auth/refreshToken');
        return response.token;
    }

    async logout() {
        await this.client.post('/auth/logout');
    }
    async forgotPassword(email: string) {
        const response = await this.client.post('/auth/forgotPassword', JSON.stringify({ email }));
        return response;
    }

    async resetPassword(token: string, password: string, passwordConfirm: string) {
        const response = await this.client.post(`/auth/resetPassword/${token}`, JSON.stringify({ password, passwordConfirm }));
        return response;
    }

    async isResetPasswordTokenValid(token: string) {
        const isTokenValid = await this.client.get(`/auth/isResetPasswordTokenValid/${token}`);
        return isTokenValid;
    }
}
