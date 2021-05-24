import { speechAudiometry } from '../../../models/entities/SP';
import BaseController from '..';
import ISpeechAudiometry from './ISpeechAudiometry';

export default class SPApi extends BaseController implements ISpeechAudiometry {
    constructor(baseUrl: string) {
        super(baseUrl);
    }
}
