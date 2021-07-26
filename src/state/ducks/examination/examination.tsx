import { Examination } from '../../../models/entities/examination';
import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';

export type examinationStateType = {
    examinationInfo?: Examination;
};
export const examination: ModelConfig<examinationStateType> = {
    state: {},
    reducers: {
        setExamination(state: examinationStateType, examinationInfo: Examination): examinationStateType {
            return { ...state, examinationInfo };
        }
    },
    effects: (dispatch: any) => ({
        postExamination(examination: Examination) {
            console.log('Post create examination with body: ', examination);
            return client.examination().postExamination(examination);
        },
        async getExaminationById(examinationId: string) {
            const response = await client.examination().getExaminationById(examinationId);
            dispatch.examination.setExamination(response);
        }
    })
};
