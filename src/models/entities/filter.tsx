import { QuestionnaireResult } from './questionnaire';

export type Filter = {
    questionnaireResult?: QuestionnaireResult;
    patientDetails?: {
        yearOfBirth: number;
    };
    examinationResult?: {
        ageOnCreate: number;
    };
};
