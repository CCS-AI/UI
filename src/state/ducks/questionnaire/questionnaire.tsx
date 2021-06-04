// import { ModelConfig } from '@rematch/core';
// import { localSDK as client } from '../../../sdk';
// import { Questionnaire } from '../../../models/entities/questionnaire';

// export type questionnaireStateType = {
//     allQ?: Questionnaire[];
// };

// export const questionnaire: ModelConfig<questionnaireStateType> = {
//     state: {},
//     reducers: {
//         // setExaminerInfo(state: examinerStateType, examinerInfo: Examiner): examinerStateType {
//         //     return { ...state, examinerInfo };
//         // }
//     },
//     effects: (dispatch: any) => ({
//         async fetchAllQuestionnaires(examiner: Examiner) {
//             const newExaminer = await client.examiner().registerExaminer(examiner);
//             return true;
//         }
//     })
// };
export {};
