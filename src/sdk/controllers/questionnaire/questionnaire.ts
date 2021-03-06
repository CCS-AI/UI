import { init } from '@rematch/core';
import { questionnaire } from './../../../state/ducks/questionnaire/questionnaire';
import BaseController from '..';
import { Questionnaire } from '../../../models/entities/questionnaire';
import IQuestionnaire from './IQuestionnaire';

export default class QuestionnaireApi extends BaseController implements IQuestionnaire {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchAllQuestionnaires() {
        const response = await this.client.get(`/questionnaire/all`);
        return response;
    }
    async getQuestionnaireById(questionnaireId: string) {
        const response = await this.client.get(`/questionnaire/${questionnaireId}`);
        return response;
    }
}
