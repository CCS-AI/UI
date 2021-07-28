import { Examination } from '../../../models/entities/examination';
import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';

export const examination: ModelConfig<Examination> = {
    state: {} as Examination,
    reducers: {},
    effects: (dispatch: any) => ({
        postExamination({ patientId, examination }: { examination: Examination; patientId: string }) {
            const response = client.examination().postExamination(examination);
            dispatch.patientMedicalFile.fetchPatientMedicalFile(patientId);
            return response;
        }
    })
};
