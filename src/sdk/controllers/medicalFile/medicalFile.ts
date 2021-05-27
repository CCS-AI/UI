import { PatientMedicalFile } from './../../../models/entities/pmf';
import BaseController from '..';
import IMedicalFile from './IMedicalFile';

export default class MedicalFileApi extends BaseController implements IMedicalFile {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchPatientMedicalFile(patientId: string) {
        const response = await this.client.get(`/patientMedicalFile/${patientId}`);
        return response;
    }
}
