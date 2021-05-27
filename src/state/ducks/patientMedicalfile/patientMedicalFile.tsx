import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { PatientMedicalFile } from '../../../models/entities/pmf';

export type patientsMedicalFileStateType = {
    patientMFInfo?: PatientMedicalFile;
};

export const patientMedicalFile: ModelConfig<patientsMedicalFileStateType> = {
    state: {},
    reducers: {
        setPatientMedicalFile(state: patientsMedicalFileStateType, patientMFInfo: PatientMedicalFile): patientsMedicalFileStateType {
            return { ...state, patientMFInfo };
        }
    },
    effects: (dispatch: any) => ({
        async fetchPatientMedicalFile(patientId: string) {
            const pmf = await client.patientMedicalFile().fetchPatientMedicalFile(patientId);
            dispatch.patientMedicalFile.setPatientMedicalFile(pmf);
        },
        async setSingleProduct() {
            dispatch.patientMedicalFile.setPatientMedicalFile(null);
        }
    })
};
