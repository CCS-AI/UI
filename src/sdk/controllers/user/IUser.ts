import { userInfo } from '../../../models/entities/user';

export default interface IUser {
    fetchUserInfo: () => Promise<Array<userInfo>>;
    getUserById: (userId: string) => Promise<userInfo>;
    updateUserPassword: (currentPassword: string, password: string, passwordConfirm: string) => Promise<void>;
}
