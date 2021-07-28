import { Patient } from './../../../models/entities/patient';
import BaseController from '..';
import IExamination from './IExamination';
import { Examination } from '../../../models/entities/examination';

export default class ExaminationAPI extends BaseController implements IExamination {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async postExamination(examination: Examination): Promise<any> {
        const response = await this.client.post(`/examination`, JSON.stringify(examination));
        return response;
    }
}
