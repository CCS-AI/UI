import BaseController from '..';
import IUser from './IUser';

export default class UserApi extends BaseController implements IUser {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchUserInfo() {
        const response = await this.client.get('/user');
        return response;
    }
    async getUserById(userId: string) {
        const response = await this.client.get(`/user/${userId}`);
        return response;
    }

    async updateUserPassword(currentPassword: string, password: string, passwordConfirm: string) {
        const response = await this.client.post('/user/updatePassword', JSON.stringify({ currentPassword, password, passwordConfirm }));
        return response;
    }
}
