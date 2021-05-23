import React from 'react';
import { Formik, Form } from 'formik';
import Loader from '../../../shared/SmallComponents/Loader';
import { FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button } from '@material-ui/core';
import { registerExaminerSchema } from '../../../../validationSchemas/registerExaminerForm';
import { Examiner } from '../../../../models/entities/examiner';
import { Flex, FormCard, FormHeader } from '../../../shared/form/StyledFormShared';

type RegisterExaminerProps = {
    showLoader: boolean;
    error: string;
    registerExaminer: (examiner: Examiner) => void;
};

const RegisterExaminerForm = ({ showLoader, error, registerExaminer }: RegisterExaminerProps) => {
    const initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: new Date(),
        licenseNumber: ''
    };

    const submitNewExaminer = (examiner: Examiner) => {
        registerExaminer(examiner);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={registerExaminerSchema()}
                onSubmit={(values) => {
                    submitNewExaminer({
                        email: values.email.trim(),
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        phoneNumber: values.phoneNumber,
                        birthDate: values.birthDate,
                        licenseNumber: values.licenseNumber
                    } as Examiner);
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid } = formik;
                    return (
                        <FormCard>
                            <FormHeader>הוספת מטפל חדש למערכת</FormHeader>
                            <Form>
                                <Flex>
                                    <FormTextInput required label="שם פרטי" name="firstName" autoFocus />
                                    <FormTextInput required label="שם משפחה" name="lastName" />
                                </Flex>
                                <Flex>
                                    <FormTextInput required label="איימיל" name="email" />
                                    <FormTextInput required label="סיסמא" name="password" />
                                </Flex>
                                <FormTextInput required label="מספר טלפון" name="phoneNumber" />
                                <FormTextInput required label="תאריך לידה" name="birth" type="Date" />
                                <FormTextInput required label="מספר רישיון" name="licenseNumber" />
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    {showLoader || false ? (
                                        <Loader width="20px" marginTop="0px" showText={false} color="white" />
                                    ) : (
                                        <span>{'הוספה'}</span>
                                    )}
                                </Button>
                                <ErrorMsg>{error}</ErrorMsg>
                            </Form>
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
export default RegisterExaminerForm;
