import { Examination } from './examination';
import { Patient } from './patient';

export type pmfInfo = {
    id: string;
    patientId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type PatientMedicalFile = pmfInfo & {
    patient: Patient;
    examinations: Array<Examination>;
};
