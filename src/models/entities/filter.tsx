import { ExamPointTypes } from './examPointTypes';
import { Gender, HMO } from './patient';
import { QuestionnaireResult } from './questionnaire';

export type Filter = {
    questionnaireResult?: QuestionnaireResult;
    patientDetails?: PatientFilterDetails;
    examinationResult?: ExaminationFilterResult;
};

export type PatientFilterDetails = {
    gender: Gender;
    yearOfBirth: number;
    hmo: HMO;
};

export type ExaminationFilterResult = {
    examinationDate: Date;
    ageOnCreate: number;
    examiner: string;
    frequency1: number;
    frequency2: number;
    type: ExamPointTypes;
    operation: '<' | '>' | '=';
    operationNumber: number;
};
