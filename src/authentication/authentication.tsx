import { localSDK as client } from '../sdk';
import { loginResponse } from '../sdk/controllers/auth/auth';

class Authentication {
    private token?: string;

    public async Authenticate(username: string, password: string, recaptchaToken?: string): Promise<loginResponse> {
        const loginResponse = await client.auth().login(username, password, recaptchaToken);
        if (loginResponse.token) {
            this.SetToken(loginResponse.token);
            if ('Notification' in window) Notification.requestPermission();
        }
        return loginResponse;
    }
    public async ForgotPassword(email: string): Promise<void> {
        const response = await client.auth().forgotPassword(email);
        return response;
    }
    public async ResetPassword(token: string, password: string, passwordConfirm: string): Promise<void> {
        const response = await client.auth().resetPassword(token, password, passwordConfirm);
        return response;
    }
    public async IsResetPasswordTokenValid(token: string): Promise<boolean> {
        const isTokenValid = await client.auth().isResetPasswordTokenValid(token);
        return isTokenValid;
    }

    public GetToken() {
        return this.token;
    }

    public SetToken(token: string) {
        this.token = token;
    }
}
export default new Authentication();
