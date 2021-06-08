import { speechAudiometry } from './SP';
import { Data } from '../../components/pages/Examination/CreateExamination';
import { QuestionnaireResult } from './questionnaire';

export type Examination = {
    pmfId: string;
    createdAt: Date;
    updatedAt: Date;
    info: Array<Data>;
    speechAudiometry: speechAudiometry;
    patientTestBackground: string;
    questionnaireResults: QuestionnaireResult;
};
