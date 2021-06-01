import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { BtnLoader } from '../../../shared/SmallComponents/Loader';
import { FormDropDown, FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button } from '@material-ui/core';
import { createPatientSchema } from '../../../../validationSchemas/createPatientForm';
import { Patient } from '../../../../models/entities/patient';
import { FormCard, FormHeader, Flex, RoundedButton, SuccessContainer } from '../../../shared/form/StyledFormShared';
import SaveIcon from '@material-ui/icons/Save';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type CreatePatientProps = {
    showLoader: boolean;
    createPatient: (patient: Patient) => Promise<boolean>;
};

const CreatePatientForm = ({ showLoader, createPatient }: CreatePatientProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const initialValues = {
        firstName: '',
        lastName: '',
        gender: undefined,
        birth: new Date(),
        address: '',
        phone1: '',
        phone2: '',
        email: '',
        hmo: undefined,
        personalId: ''
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={createPatientSchema()}
                onSubmit={(values) => {
                    createPatient({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        gender: values.gender || 1,
                        birth: values.birth,
                        address: values.address,
                        phone1: values.phone2,
                        phone2: values.phone1,
                        email: values.email.trim(),
                        hmo: values.hmo || 1,
                        personalId: values.personalId
                    } as Patient).then((value) => {
                        if (value) setShowSuccess(true);
                    });
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid } = formik;
                    return (
                        <FormCard>
                            <FormHeader>הוספת מטופל חדש למערכת</FormHeader>
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
                                        <FormTextInput required label="תעודת זהות" name="personalId" />
                                        <FormTextInput required label="אימייל" name="email" />
                                    </Flex>
                                    <Flex>
                                        <FormDropDown
                                            name="gender"
                                            options={[
                                                { value: 1, text: 'זכר' },
                                                { value: 2, text: 'נקבה' }
                                            ]}
                                            placeHolder="מין"
                                        />
                                        <FormDropDown
                                            name="hmo"
                                            options={[
                                                { value: 1, text: 'כללית' },
                                                { value: 2, text: 'מכבי' },
                                                { value: 3, text: 'לאומית' }
                                            ]}
                                            placeHolder="קופת חולים"
                                        />
                                    </Flex>
                                    <Flex>
                                        <FormTextInput required label="מספר טלפון" name="phone1" />
                                        <FormTextInput required label="מספר טלפון נוסף" name="phone2" />
                                    </Flex>
                                    <Flex>
                                        <FormTextInput required label="כתובת" name="address" />
                                    </Flex>
                                    <Flex>
                                        <FormTextInput required label="תאריך לידה" name="birth" type="Date" />
                                    </Flex>
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

export default CreatePatientForm;
