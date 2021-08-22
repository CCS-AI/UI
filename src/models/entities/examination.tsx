import { speechAudiometry } from './SP';
import { Data } from '../../components/pages/Examination/CreateExamination';
import { QuestionnaireResult } from './questionnaire';
import { Examiner } from './examiner';

export type Examination = {
    id: string;
    pmfId: string;
    createdAt: Date;
    updatedAt: Date;
    info: Array<Data>;
    speechAudiometry: speechAudiometry;
    summary: string;
    questionnaireResults: QuestionnaireResult;
    ageOnCreate?: number;
    examinerId?: string;
    examiner?: Examiner;
};
