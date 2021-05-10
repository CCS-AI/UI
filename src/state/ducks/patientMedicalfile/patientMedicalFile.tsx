import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { PatientMedicalFile } from '../../../models/entities/pmf';

export type patientsMedicalFileStateType = {
    pmfInfo?: PatientMedicalFile;
};

export const patientMedicalFile: ModelConfig<patientsMedicalFileStateType> = {
    state: {},
    reducers: {
        setPatientMedicalFile(state: patientsMedicalFileStateType, pmfInfo: PatientMedicalFile): patientsMedicalFileStateType {
            return { ...state, pmfInfo };
        }
    },
    effects: (dispatch: any) => ({
        async fetchPatientMedicalFile(patientId: string) {
            const pmf = await client.patientMedicalFile().fetchPatientMedicalFile(patientId);
            dispatch.patientMedicalFile.setPatientMedicalFile(pmf);
        }
    })
};
