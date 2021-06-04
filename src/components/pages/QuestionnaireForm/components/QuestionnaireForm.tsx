import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { BtnLoader } from '../../../shared/SmallComponents/Loader';
import { FormCheckbox, FormDropDown, FormTextArea, FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import { createPatientSchema } from '../../../../validationSchemas/createPatientForm';
import { Patient } from '../../../../models/entities/patient';
import { FormCard, FormHeader, Flex, RoundedButton, SuccessContainer } from '../../../shared/form/StyledFormShared';
import SaveIcon from '@material-ui/icons/Save';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { questionR, Question, Questionnaire } from '../../../../models/entities/questionnaire';

type CreateQuestionnaireProps = {
    showLoader: boolean;

    // createPatient: (patient: Patient) => Promise<boolean>;
    // getQuestionnaire: (questionnaireId: string) => Promise<Questionnaire>;};
    //uestionnaire: Questionnaire;
};

const emptyQuestionRes = { id: '', name: '', answers: [] } as questionR;
const emptyQ = { id: '', name: '', questionnaireId: '', answers: [] } as Question;
const initQ = {
    id: '123',
    name: 'האם חלית בקורונה',
    questionnaireId: 'sdfds',
    answers: [
        { id: '2313', name: 'כן', questionId: '123' },
        { id: '2314', name: 'לא', questionId: '123' },
        { id: '2315', name: 'אולי', questionId: '123' }
    ]
};

const CreateQuestnnaireForm = ({ showLoader }: CreateQuestionnaireProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const initialValues = { questions: [initQ] };
    const [resultValues, setResultValues] = useState(initialValues);
    // const initRes () =>{
    //     resultValues.forEach((q) => {
    // )}
    // };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('my values', resultValues);
                    // createPatient({
                    //     firstName: values.firstName,
                    //     lastName: values.lastName,
                    //     gender: values.gender || 1,
                    //     birth: values.birth,
                    //     address: values.address,
                    //     phone1: values.phone2,
                    //     phone2: values.phone1,
                    //     email: values.email.trim(),
                    //     hmo: values.hmo || 1,
                    //     personalId: values.personalId
                    // } as Patient).then((value) => {
                    //     if (value) setShowSuccess(true);
                    // });
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
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">{q.name}</FormLabel>
                                                <RadioGroup aria-label="ans" name="ans">
                                                    {q.answers.map((ans, indexA) => {
                                                        return (
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                            resultValues.questions[indexQ].answers = [
                                                                                resultValues.questions[indexQ].answers[indexA]
                                                                            ];
                                                                        }}
                                                                        name={ans.id}
                                                                    />
                                                                }
                                                                label={ans.name}
                                                            />
                                                        );
                                                        // return <FormControlLabel value={ans.id} control={<Radio />} label={ans.name} />
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
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
