import { authentication } from './authentication/authentication';
import { localization } from './localization/localization';
import { user } from './user/user';
import { patient } from './patient/patient';
import { examiner } from './examiner/examiner';
import { patientMedicalFile } from './patientMedicalfile/patientMedicalFile';
import { examination } from './examination/examination';
import { questionnaire } from './questionnaire/questionnaire';

export interface RootModel {
    authentication: typeof authentication;
    localization: typeof localization;
    user: typeof user;
    patient: typeof patient;
    examiner: typeof examiner;
    patientMedicalFile: typeof patientMedicalFile;
    examination: typeof examination;
    questionnaire: typeof questionnaire;
}

export const models: RootModel = {
    authentication,
    localization,
    user,
    patient,
    examiner,
    patientMedicalFile,
    examination,
    questionnaire
};
