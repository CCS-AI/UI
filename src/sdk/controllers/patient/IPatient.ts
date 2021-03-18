import { Patient } from '../../../models/entities/patient';

export default interface IPatient {
    fetchAllPatients: () => Promise<Array<Patient>>;
    getPatientById: (patientId: string) => Promise<Patient>;
}
