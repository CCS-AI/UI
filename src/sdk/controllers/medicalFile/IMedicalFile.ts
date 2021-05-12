import { PatientMedicalFile } from './../../../models/entities/pmf';

export default interface IMedicalFile {
    fetchPatientMedicalFile: (patientId: string) => Promise<PatientMedicalFile>;
}
