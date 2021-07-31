import React, { useEffect, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { BtnLoader } from '../../../shared/SmallComponents/Loader';
import { styled } from '../../../shared/Theme/theme';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup, Typography } from '@material-ui/core';
import { FormCard, FormHeader, Flex, RoundedButton, SuccessContainer } from '../../../shared/form/StyledFormShared';
import SaveIcon from '@material-ui/icons/Save';
import { QuestionR, Question, Questionnaire, Answer, QuestionnaireResult } from '../../../../models/entities/questionnaire';
import { isEqual, result } from 'lodash';
import NavigateNextIcon from '@material-ui/icons/ChevronLeft';

type CreateQuestionnaireProps = {
    showLoader: boolean;
    questionnaire: Questionnaire;
    setQuestionnaireResInfo: (result: QuestionnaireResult) => void;
    setdisabledDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const emptyQuestionnaire = { id: '', name: '', questions: [] } as Questionnaire;
const emptyQquestionnaireRes = [] as QuestionnaireResult;

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

export const convertToQuestnnairResult = (resultQ: Questionnaire, selectedQId: string) => {
    let qr = emptyQquestionnaireRes;
    resultQ.questions.forEach((q) => {
        if (q.questionnaireId == selectedQId) {
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
        }
    });
    return qr;
};

const CreateQuestnnaireForm = ({ showLoader, questionnaire, setQuestionnaireResInfo, setdisabledDropDown }: CreateQuestionnaireProps) => {
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
                        let convertedQ = convertToQuestnnairResult(resultValues, values.questions[0].questionnaireId);
                        setQuestionnaireResInfo(convertedQ);
                        setdisabledDropDown(true);
                    }
                }}
            >
                {(formik) => {
                    const { values, errors, touched, isValid } = formik;
                    return (
                        <Form>
                            <Container>
                                {values.questions.map((q, indexQ) => {
                                    return (
                                        <div key={indexQ}>
                                            <CustomFormControl>
                                                <CustomFormLabel>{q.name}</CustomFormLabel>
                                                <CustomRadioGroup aria-label="ans" name="ans">
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
                                                </CustomRadioGroup>
                                            </CustomFormControl>
                                        </div>
                                    );
                                })}
                            </Container>
                            <Footer>
                                <RoundedButton type="submit" variant="contained" color="primary" size="large" endIcon={<NavigateNextIcon />}>
                                    {showLoader ? <BtnLoader /> : <span>{'הבא'}</span>}
                                </RoundedButton>
                            </Footer>
                        </Form>
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
    margin: 20px 0;
`;
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        flex: 1;
        flex-basis: 15%;
    }
    margin-top: 20px 0;
`;
const CustomFormControl = styled(FormControl)`
    margin: 20px !important;
`;
const CustomRadioGroup = styled(RadioGroup)`
    max-height: 200px;
    overflow-y: auto;
    flex-wrap: initial !important;
    margin-top: 5px;
`;
const CustomFormLabel = styled(FormLabel)`
    font-size: 18px !important;
    font-weight: bold !important;
    color: #1a2c3a !important;
`;
export default CreateQuestnnaireForm;
