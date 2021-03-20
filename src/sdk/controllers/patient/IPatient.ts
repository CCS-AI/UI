import { Patient } from './../../../models/entities/patient';
export default interface IPatient {
    fetchAllPatients: () => Promise<Patient[]>;
    getPatientById: (patientId: string) => Promise<Patient>;
    createPatient: (paitent: Patient) => void;
}
