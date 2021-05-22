import { speechAudiometry } from '../../../models/entities/SP';
import BaseController from '..';
import ISpeechAudiometry from './ISpeechAudiometry';

export default class SPApi extends BaseController implements ISpeechAudiometry {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
    // async setSP(sp: speechAudiometry) {
    //     return sp;
    //      const response = await this.client.get(`/patientMedicalFile/${patientId}`);
    //     return response;
    // }
}
