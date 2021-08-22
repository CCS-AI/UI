import { Examiner } from './../../../models/entities/examiner';
import BaseController from '..';
import IExaminer from './IExaminer';

export default class ExaminerApi extends BaseController implements IExaminer {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    async registerExaminer(examiner: Examiner) {
        const response = await this.client.post('/examiner/register', JSON.stringify(examiner));
        return response;
    }

    async fetchAllExaminers() {
        const response = await this.client.get('/examiner/all');
        return response;
    }
    async getExaminerByID(examinerId: string) {
        const response = await this.client.get(`/examiner/${examinerId}`);
        return response;
    }
}
