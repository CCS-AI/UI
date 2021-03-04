import { authentication } from './authentication/authentication';
import { localization } from './localization/localization';
import { user } from './user/user';

export interface RootModel {
    authentication: typeof authentication;
    localization: typeof localization;
    user: typeof user;
}

export const models: RootModel = {
    authentication,
    localization,
    user,
};
