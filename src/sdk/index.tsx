import Auth from './controllers/auth/auth';
import User from './controllers/user/user';
import Patient from './controllers/patient/patient';
import Examiner from './controllers/examiner/examiner';
import PatientApiMock from './controllers/patient/patientMock';
import PatientMedicalFile from './controllers/medicalFile/medicalFile';
import speechAudiometry from './controllers/speechAudio/speechAudio';

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
    patients() {
        this.isMock = false;
        if (this.isMock) return new PatientApiMock(this.baseUrl);
        return new Patient(this.baseUrl);
    }
    examiner() {
        return new Examiner(this.baseUrl);
    }
    patientMedicalFile() {
        return new PatientMedicalFile(this.baseUrl);
    }
    speechAudiometry() {
        return new speechAudiometry(this.baseUrl);
    }
}

export const localSDK = new ccsSDK(`${process.env.REACT_APP_API_URL}`);
