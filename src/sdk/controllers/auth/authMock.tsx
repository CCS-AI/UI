import IAuth from './IAuth';
import SideEffectJs from 'side-effect-js';

export default class Auth implements IAuth {
    async forgotPassword(email: string) {}
    async resetPassword(token: string, password: string, resetPassword: string) {}
    async isResetPasswordTokenValid(token: string) {
        return false;
    }
    async login(email: string, password: string) {
        const login = SideEffectJs.Get('login');

        return login(email, password)
            .then((token: string) => {
                return Promise.resolve(token);
            })
            .catch((error: string) => {
                return Promise.reject(error);
            });
    }

    async refreshToken() {
        return Promise.resolve('');
    }

    async logout() {}
}
