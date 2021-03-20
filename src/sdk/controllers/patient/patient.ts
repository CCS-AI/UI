import { Patient } from '../../../models/entities/patient';
import BaseController from '..';
import IPatient from './IPatient';

export default class PatientApi extends BaseController implements IPatient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchAllPatients() {
        const response = await this.client.get('/patients');
        return response;
    }
    async getPatientById(patientId: string) {
        const response = await this.client.get(`/user/${patientId}`);
        return response;
    }
}
