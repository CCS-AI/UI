import { Patient } from '../../../models/entities/patient';
import BaseController from '..';
import IPatient from './IPatient';

export default class PatientApiMock extends BaseController implements IPatient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchAllPatients() : Promise<Patient[]>{
        const response = Promise.resolve([]);
        return response
    }
    async getPatientById(patientId: string) {
        const response = await this.client.get(`/user/${patientId}`);
        return response;
    }
}
