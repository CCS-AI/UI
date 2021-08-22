import { NumberLocale } from 'yup';
import { ExamPointTypes } from './examPointTypes';
import { Gender, HMO } from './patient';
import { QuestionnaireResult } from './questionnaire';

export type Filter = {
    filter: {
        questionnaireResult?: QuestionnaireResult;
        patientDetails?: PatientFilterDetails;
        examinationResult?: ExaminationFilterResult;
    };
};
export type PatientFilterDetails = {
    gender: Gender | undefined;
    yearOfBirth: number | undefined;
    hmo: HMO | undefined;
};

export type ExaminationFilterResult = {
    frequency1: number | undefined;
    frequency2: number | undefined;
    type: ExamPointTypes | undefined;
    operation: '<' | '>' | '=' | undefined;
    operationNumber: number | undefined;
    ageOnCreate: number | undefined;
    examiner: string | undefined;
    examinationDate: Date | undefined;
    earSide: 'RIGHT' | 'LEFT' | undefined;
};
