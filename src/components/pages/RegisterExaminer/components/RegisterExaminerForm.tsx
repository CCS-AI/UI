import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Loader, { BtnLoader } from '../../../shared/SmallComponents/Loader';
import { FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button } from '@material-ui/core';
import { registerExaminerSchema } from '../../../../validationSchemas/registerExaminerForm';
import { Examiner } from '../../../../models/entities/examiner';
import { Flex, FormCard, FormHeader, RoundedButton, SuccessContainer } from '../../../shared/form/StyledFormShared';
import SaveIcon from '@material-ui/icons/Save';

type RegisterExaminerProps = {
    showLoader: boolean;
    registerExaminer: (examiner: Examiner) => Promise<boolean>;
};

const RegisterExaminerForm = ({ showLoader, registerExaminer }: RegisterExaminerProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: new Date(),
        licenseNumber: ''
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={registerExaminerSchema()}
                onSubmit={(values) => {
                    registerExaminer({
                        email: values.email.trim(),
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        phoneNumber: values.phoneNumber,
                        birthDate: values.birthDate,
                        licenseNumber: values.licenseNumber
                    } as Examiner).then((value) => {
                        if (value) setShowSuccess(true);
                    });
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid } = formik;
                    return (
                        <FormCard>
                            <FormHeader>הוספת מטפל חדש למערכת</FormHeader>
                            {showSuccess ? (
                                <SuccessContainer>
                                    <span className="material-icons">check_circle</span>
                                    <div>נוצר בהצלחה</div>
                                </SuccessContainer>
                            ) : (
                                <Form>
                                    <Flex>
                                        <FormTextInput required label="שם פרטי" name="firstName" autoFocus />
                                        <FormTextInput required label="שם משפחה" name="lastName" />
                                    </Flex>
                                    <Flex>
                                        <FormTextInput required label="איימיל" name="email" />
                                        <FormTextInput required label="סיסמא" name="password" type="password" />
                                    </Flex>
                                    <FormTextInput required label="מספר טלפון" name="phoneNumber" />
                                    <FormTextInput required label="תאריך לידה" name="birth" type="Date" />
                                    <FormTextInput required label="מספר רישיון" name="licenseNumber" />
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
export default RegisterExaminerForm;
