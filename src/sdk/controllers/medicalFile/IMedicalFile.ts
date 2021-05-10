import { PatientMedicalFile } from './../../../models/entities/pmf';

export default interface IPatient {
    fetchPatientMedicalFile: (patientId: string) => Promise<PatientMedicalFile>;
}
