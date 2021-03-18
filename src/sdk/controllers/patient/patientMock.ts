import { Gender, HMO } from './../../../models/entities/patient';
import { Patient } from '../../../models/entities/patient';
import BaseController from '..';
import IPatient from './IPatient';

export default class PatientApiMock extends BaseController implements IPatient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchAllPatients() {
        let response = await this.client.get('/');
        response = [
            new Patient(
                'ofek',
                'rozenkrantz',
                '123',
                Gender.MALE,
                '14-03-2021',
                'Mivtza Dekel 11',
                '0545516772',
                '054772821',
                'ofek@gmail.com',
                HMO.CLALIT,
                'Belinson'
            ),
            new Patient(
                'ofek2',
                'rozenkrantz2',
                '1234',
                Gender.MALE,
                '14-03-2021',
                'Mivtza Dekel 11',
                '0545516772',
                '054772821',
                'ofek@gmail.com',
                HMO.MACABI,
                'Asuta'
            )
        ];
        return response;
    }
    async getPatientById(patientId: string) {
        const response = await this.client.get(`/user/${patientId}`);
        return response;
    }
}
