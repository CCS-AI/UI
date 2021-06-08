import { Examination } from '../../../models/entities/examination';
import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';

export const examination: ModelConfig<Examination> = {
    state: {} as Examination,
    reducers: {},
    effects: (dispatch: any) => ({
        postExamination(examination: Examination) {
            console.log('Post create examination with body: ', examination);
            return client.examination().postExamination(examination);
        }
    })
};
