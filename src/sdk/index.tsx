import Auth from './controllers/auth/auth';
import User from './controllers/user/user';

class ccsSDK {
    private baseUrl: string;
    private isMock: boolean;

    constructor(baseUrl: string = '', isMock: boolean = false) {
        this.baseUrl = baseUrl;
        this.isMock = isMock;
    }
    auth() {
        // if (this.isMock) return new AuthMock();
        return new Auth(this.baseUrl);
    }
    user() {
        return new User(this.baseUrl);
    }
}

export const localSDK = new ccsSDK(`${process.env.REACT_APP_API_URL}`);
