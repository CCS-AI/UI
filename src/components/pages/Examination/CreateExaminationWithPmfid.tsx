import { RouteComponentProps } from 'react-router-dom';
import { QuestionnaireResult } from '../../../models/entities/questionnaire';
import { Examination } from '../../../models/entities/examination';
import CreateExamination from './CreateExamination';
import React, { useEffect, useState } from 'react';

type CreateExaminationProps = {
    questionnaireResults: QuestionnaireResult;
    pmfid: string;
};

export const CreateExaminationWithPmfid = (props: CreateExaminationProps) => {
    return <CreateExamination pmfid={props.pmfid} questionnaireResults={props.questionnaireResults} />;
};
