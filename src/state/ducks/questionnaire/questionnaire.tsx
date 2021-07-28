import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import { Questionnaire } from '../../../models/entities/questionnaire';

export type questionnaireStateType = {
    questionnaireInfo?: Questionnaire;
};

export const questionnaire: ModelConfig<questionnaireStateType> = {
    state: {},
    reducers: {
        setQuestionnaire(state: questionnaireStateType, questionnaireInfo: Questionnaire): questionnaireStateType {
            return { ...state, questionnaireInfo };
        }
    },
    effects: (dispatch: any) => ({
        async fetchAllQuestionnaires() {
            const response = await client.questionnaire().fetchAllQuestionnaires();
            return response;
        },
        async getQuestionnaireById(questionnaireId: string) {
            const response = await client.questionnaire().getQuestionnaireById(questionnaireId);
            dispatch.questionnaire.setQuestionnaire(response);
        },
        async setSingleQuestionnaire() {
            dispatch.questionnaire.setQuestionnaire(null);
        }
    })
};
