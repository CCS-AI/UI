import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { Examiner } from '../../../models/entities/examiner';

export type examinerStateType = {
    examinerInfo?: Examiner;
};

export const examiner: ModelConfig<examinerStateType> = {
    state: {},
    reducers: {
        setExaminerInfo(state: examinerStateType, examinerInfo: Examiner): examinerStateType {
            return { ...state, examinerInfo };
        }
    },
    effects: (dispatch: any) => ({
        async registerExaminer(examiner: Examiner) {
            const newExaminer = await client.examiner().registerExaminer(examiner);
        }
    })
};
