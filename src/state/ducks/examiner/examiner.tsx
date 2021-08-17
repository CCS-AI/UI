import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { Examiner } from '../../../models/entities/examiner';
import { Patient } from '../../../models/entities/patient';
import { patientsStateType } from '../patient/patient';

export type examinerStateType = {
    examinerInfo?: Examiner;
    //should be changed to Examiner[]
    allExaminers?: string[];
};

export const examiner: ModelConfig<examinerStateType> = {
    state: {},
    reducers: {
        setExaminerInfo(state: examinerStateType, examinerInfo: Examiner): examinerStateType {
            return { ...state, examinerInfo };
        },

        //allExaminers should be changed to Examiner[]
        setAllExaminers(state: examinerStateType, allExaminers: string[]) {
            return { ...state, allExaminers };
        }
    },
    effects: (dispatch: any) => ({
        async registerExaminer(examiner: Examiner) {
            const newExaminer = await client.examiner().registerExaminer(examiner);
            return true;
        },

        async fetchAllExaminers() {
            const examiners = await client.examiner().fetchAllExaminers();
            dispatch.examiner.setAllExaminers(examiners);
        }
    })
};
