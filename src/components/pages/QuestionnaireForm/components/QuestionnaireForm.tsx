// import React, { useState } from 'react';
// import { Formik, Form, FieldArray } from 'formik';
// import { BtnLoader } from '../../../shared/SmallComponents/Loader';
// import { FormDropDown, FormTextInput } from '../../../shared/inputs/form';
// import { styled } from '../../../shared/Theme/theme';
// import { Button } from '@material-ui/core';
// import { createPatientSchema } from '../../../../validationSchemas/createPatientForm';
// import { Patient } from '../../../../models/entities/patient';
// import { FormCard, FormHeader, Flex, RoundedButton, SuccessContainer } from '../../../shared/form/StyledFormShared';
// import SaveIcon from '@material-ui/icons/Save';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import { Questionnaire } from '../../../../models/entities/questionnaire';

// type CreateQuestionnaireProps = {
//     // createPatient: (patient: Patient) => Promise<boolean>;
//    // getQuestionnaire: (questionnaireId: string) => Promise<Questionnaire>;};
//    questionnaire: Questionnaire;
// }
// const CreateQuestnnaireForm = ({questionnaire }: CreateQuestionnaireProps) => {
//     const [showSuccess, setShowSuccess] = useState(false);
//     const initialValues = questionnaire.questions;

//     return (
//         <>
//             <Formik
//                 initialValues={initialValues}

//                 onSubmit={(values) => {
//                     // createPatient({
//                     //     firstName: values.firstName,
//                     //     lastName: values.lastName,
//                     //     gender: values.gender || 1,
//                     //     birth: values.birth,
//                     //     address: values.address,
//                     //     phone1: values.phone2,
//                     //     phone2: values.phone1,
//                     //     email: values.email.trim(),
//                     //     hmo: values.hmo || 1,
//                     //     personalId: values.personalId
//                     // } as Patient).then((value) => {
//                     //     if (value) setShowSuccess(true);
//                     // });
//                 }}
//             >
//                 {(formik) => {
//                     const { errors, touched, isValid } = formik;
//                     return (
//                         <FormCard>
//                             {/* <FormHeader>הוספת מטופל חדש למערכת</FormHeader> */}
//                             {showSuccess ? (
//                                 <SuccessContainer>
//                                     <span className="material-icons">check_circle</span>
//                                     <div>נוצר בהצלחה</div>
//                                 </SuccessContainer>
//                             ) : (
//                                 <Form>
//                                     <FieldArray name="questions">
//                                         {({form, ...fieldArrayHelpers}) => {
//                                         fieldArrayHelpers.push({

//                                         })

//                                         }
//                                         <FormTextInput required label="שם פרטי" name="firstName" autoFocus />
//                                     </FieldArray>
//                                     <Footer>
//                                         <RoundedButton type="submit" variant="contained" color="primary" size="large" startIcon={<SaveIcon />}>
//                                             {showLoader ? <BtnLoader /> : <span>{'הוספה'}</span>}
//                                         </RoundedButton>
//                                     </Footer>
//                                 </Form>
//                             )}
//                         </FormCard>
//                     );
//                 }}
//             </Formik>
//         </>
//     );
// };

// const ErrorMsg = styled.div`
//     color: red;
//     text-align: center;
// `;

// const Footer = styled.div`
//     display: flex;
//     justify-content: center;
//     margin-top: 20px;
// `;

// export default CreatePatientForm;
export {};
