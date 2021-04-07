import { authentication } from './authentication/authentication';
import { localization } from './localization/localization';
import { user } from './user/user';
import { patient } from './patient/patient';
import { examiner } from './examiner/examiner';

export interface RootModel {
    authentication: typeof authentication;
    localization: typeof localization;
    user: typeof user;
    patient: typeof patient;
    examiner: typeof examiner;
}

export const models: RootModel = {
    authentication,
    localization,
    user,
    patient,
    examiner
};
