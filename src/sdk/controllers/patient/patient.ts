import { Patient } from './../../../models/entities/patient';
import BaseController from '..';
import IPatient from './IPatient';
import { Filter } from '../../../models/entities/filter';

export default class PatientApi extends BaseController implements IPatient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchAllPatients(filter: Filter) {
        const response = await this.client.post(`/patient/all`, JSON.stringify(filter));
        return response;
    }
    async getPatientById(patientId: string) {
        const response = await this.client.get(`/user/${patientId}`);
        return response;
    }
    async createPatient(patient: Patient) {
        const response = await this.client.post('/patient', JSON.stringify(patient));
        return response;
    }
}
