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
    gender: Gender;
    yearOfBirth: number;
    examinationDate: Date;
    hmo: HMO;
};

export type ExaminationFilterResult = {
    frequency1: number;
    frequency2: number;
    type: ExamPointTypes;
    operation: '<' | '>' | '=';
    operationNumber: number;
    ageOnCreate: number;
    examiner: string;
};
