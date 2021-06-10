import { init } from '@rematch/core';
import { questionnaire } from './../../../state/ducks/questionnaire/questionnaire';
import BaseController from '..';
import { Questionnaire } from '../../../models/entities/questionnaire';
import IQuestionnaire from './IQuestionnaire';

export const initQ3 = { id: 'Q125', name: 'אנמנזההה5', questions: [] } as Questionnaire;

export const initQ = {
    id: 'Q123',
    name: 'אנמנזההה',
    questions: [
        {
            id: '123',
            name: 'האם חלית בקורונה',
            questionnaireId: 'Q123',
            answers: [
                { id: '2313', name: 'כן', questionId: '123' },
                { id: '2314', name: 'לא', questionId: '123' },
                { id: '2315', name: 'אולי', questionId: '123' }
            ]
        },
        {
            id: '124',
            name: '2האם חלית בקורונה',
            questionnaireId: 'Q123',
            answers: [
                { id: '2316', name: 'כן1', questionId: '124' },
                { id: '2317', name: '1לא', questionId: '124' },
                { id: '2318', name: '1אולי', questionId: '124' }
            ]
        }
    ]
} as Questionnaire;

export const initQ2 = {
    id: 'Q124',
    name: '2אנמנזההה',
    questions: [
        {
            id: '123A',
            name: 'Aהאם חלית בקורונה',
            questionnaireId: 'Q124',
            answers: [
                { id: '2313', name: 'Aכן', questionId: '123A' },
                { id: '2314', name: 'Aלא', questionId: '123A' },
                { id: '2315', name: 'Aאולי', questionId: '123A' }
            ]
        },
        {
            id: '124A',
            name: '2האם חלית בקורונה',
            questionnaireId: 'Q124',
            answers: [
                { id: '2316', name: 'כןB', questionId: '124A' },
                { id: '2317', name: 'Bלא', questionId: '124A' },
                { id: '2318', name: 'Bאולי', questionId: '124A' }
            ]
        }
    ]
} as Questionnaire;

export const qsts = [initQ, initQ2, initQ3];
export default class QuestionnaireMockApi extends BaseController implements IQuestionnaire {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async fetchAllQuestionnaires() {
        const response = Promise.resolve(qsts);
        return response;
    }
    async getQuestionnaireById(questionnaireId: string) {
        if (questionnaireId == 'Q123') {
            const response = Promise.resolve(qsts[0]);
            return response;
        } else if (questionnaireId == 'Q124') {
            const response = Promise.resolve(qsts[1]);
            return response;
        }
        return Promise.resolve(qsts[2]);
    }
}
