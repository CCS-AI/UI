import { Filter } from '../../../models/entities/filter';
import { Patient } from './../../../models/entities/patient';
export default interface IPatient {
    fetchAllPatients: (filter: Filter) => Promise<Patient[]>;
    getPatientById: (patientId: string) => Promise<Patient>;
    createPatient: (paitent: Patient) => void;
}
