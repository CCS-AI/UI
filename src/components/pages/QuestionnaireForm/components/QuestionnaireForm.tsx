import React, { useEffect, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { BtnLoader } from '../../../shared/SmallComponents/Loader';
import { styled } from '../../../shared/Theme/theme';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup, Typography } from '@material-ui/core';
import { FormCard, FormHeader, Flex, RoundedButton, SuccessContainer } from '../../../shared/form/StyledFormShared';
import SaveIcon from '@material-ui/icons/Save';
import { QuestionR, Question, Questionnaire, Answer, QuestionnaireResult } from '../../../../models/entities/questionnaire';
import { isEqual, result } from 'lodash';

type CreateQuestionnaireProps = {
    showLoader: boolean;
    questionnaire: Questionnaire;
    setQuestionnaireResInfo: React.Dispatch<React.SetStateAction<QuestionnaireResult | undefined>>;
    setdisabledDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const emptyQuestionnaire = { id: '', name: '', questions: [] } as Questionnaire;
const emptyQquestionnaireRes = [] as QuestionnaireResult;
const emptyQarray: Question[] = [];

export const initRes = (copyQuestionnaire: Questionnaire) => {
    let initResQ = emptyQuestionnaire;
    initResQ.id = copyQuestionnaire.id;
    initResQ.name = copyQuestionnaire.name;
    copyQuestionnaire.questions.forEach((q) => {
        let tmpQ = {
            id: q.id,
            name: q.name,
            questionnaireId: q.questionnaireId,
            answers: []
        } as Question;
        initResQ.questions.push(tmpQ);
    });
    return initResQ;
};

export const convertToQuestnnairResult = (resultQ: Questionnaire) => {
    let qr = emptyQquestionnaireRes;
    resultQ.questions.forEach((q) => {
        let ansString: string[] = [];
        q.answers.forEach((ans) => {
            ansString.push(ans.name);
        });
        let tmpQR = {
            id: q.id,
            name: q.name,
            answers: ansString
        };
        qr.push(tmpQR);
    });
    return qr;
};

const CreateQuestnnaireForm = ({ showLoader, questionnaire, setQuestionnaireResInfo, setdisabledDropDown }: CreateQuestionnaireProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [resultValues, setRes] = useState<Questionnaire | undefined>();

    useEffect(() => {
        setRes(initRes(questionnaire));
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, resultValues: Questionnaire, ans: Answer, indexQ: number) => {
        if (event.target.checked == false) {
            let filtered = resultValues.questions[indexQ].answers.filter(function (value, index, arr) {
                return !isEqual(value, ans);
            });
            resultValues.questions[indexQ].answers = filtered;
        } else {
            let newAnswer = {
                id: ans.id,
                name: ans.name,
                questionId: ans.questionId
            } as Answer;
            resultValues.questions[indexQ].answers.push(newAnswer);
        }
    };
    return (
        <>
            <Formik
                initialValues={{ questions: questionnaire.questions }}
                onSubmit={(values) => {
                    if (resultValues) {
                        let convertedQ = convertToQuestnnairResult(resultValues);
                        setQuestionnaireResInfo(convertedQ);
                        setShowSuccess(true);
                        setdisabledDropDown(true);
                    }
                }}
            >
                {(formik) => {
                    const { values, errors, touched, isValid } = formik;
                    return (
                        <FormCard>
                            <FormHeader>שאלון אנמנזה</FormHeader>
                            {showSuccess ? (
                                <SuccessContainer>
                                    <span className="material-icons">check_circle</span>
                                    <div>נוצר בהצלחה</div>
                                </SuccessContainer>
                            ) : (
                                <Form>
                                    {values.questions.map((q, indexQ) => {
                                        return (
                                            <div key={indexQ}>
                                                <FormControl>
                                                    <FormLabel>{q.name}</FormLabel>
                                                    <RadioGroup aria-label="ans" name="ans">
                                                        {q.answers.map((ans, indexA) => {
                                                            return (
                                                                <FormControlLabel
                                                                    key={indexA}
                                                                    control={
                                                                        <Checkbox
                                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                if (resultValues) {
                                                                                    handleChange(event, resultValues, ans, indexQ);
                                                                                }
                                                                            }}
                                                                            name={ans.id}
                                                                        />
                                                                    }
                                                                    value={ans.name}
                                                                    label={ans.name}
                                                                />
                                                            );
                                                        })}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        );
                                    })}
                                    <Footer>
                                        <RoundedButton type="submit" variant="contained" color="primary" size="large" startIcon={<SaveIcon />}>
                                            {showLoader ? <BtnLoader /> : <span>{'הוספה'}</span>}
                                        </RoundedButton>
                                    </Footer>
                                </Form>
                            )}
                        </FormCard>
                    );
                }}
            </Formik>
        </>
    );
};

const ErrorMsg = styled.div`
    color: red;
    text-align: center;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export default CreateQuestnnaireForm;
