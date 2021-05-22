import { authentication } from './authentication/authentication';
import { localization } from './localization/localization';
import { user } from './user/user';
import { patient } from './patient/patient';
import { examiner } from './examiner/examiner';
import { patientMedicalFile } from './patientMedicalfile/patientMedicalFile';
import { SpeechAudiometry } from './speechAudiometry/speechAudiometry';

export interface RootModel {
    authentication: typeof authentication;
    localization: typeof localization;
    user: typeof user;
    patient: typeof patient;
    examiner: typeof examiner;
    patientMedicalFile: typeof patientMedicalFile;
    SpeechAudiometry: typeof SpeechAudiometry;
}

export const models: RootModel = {
    authentication,
    localization,
    user,
    patient,
    examiner,
    patientMedicalFile,
    SpeechAudiometry
};
