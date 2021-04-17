import React, { useState } from 'react';
import { match, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FormTextInput } from '../../../shared/inputs/form';
import Loader from '../../../shared/SmallComponents/Loader';
import { styled } from '../../../shared/Theme/theme';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/store/store';
import { Button } from '@material-ui/core';

type ForgotPasswordFormProps = {
    forgotPassword: (email: string) => string;
    error: string;
    isEmailSending: boolean;
    localization: any;
    match: match;
};

const ForgotPasswordForm = ({ forgotPassword, error, isEmailSending, localization, match }: ForgotPasswordFormProps) => {
    const [message, setMessage] = useState('');

    const handleOnSendEmail = async (email: string) => {
        const response = await forgotPassword(email);
        setMessage(response);
    };

    return (
        <>
            <Formik
                initialValues={{ email: '' }}
                // validationSchema={forgotPasswordSchema(localization)}
                onSubmit={({ email }) => {
                    handleOnSendEmail(email);
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid, dirty } = formik;
                    return (
                        <FormContainer>
                            <Form>
                                <FieldContainer style={{ marginBottom: errors.email && touched.email ? '20px' : '12px' }}>
                                    <FormTextInput name="email" placeHolder={localization.email} style={{ height: '40px' }} />
                                </FieldContainer>
                                <Button type="submit" disabled={!(dirty && isValid)}>
                                    {isEmailSending ? (
                                        <Loader width="20px" marginTop="0px" showText={false} color="white" />
                                    ) : (
                                        <span>{localization.send_btn}</span>
                                    )}
                                </Button>
                            </Form>
                        </FormContainer>
                    );
                }}
            </Formik>

            <Link to={`${match.url}`}>
                <ForgetPWText>{localization.login}</ForgetPWText>
            </Link>
            <Message>{message}</Message>
            <Error>{error}</Error>
        </>
    );
};

const ForgetPWText = styled.span`
    margin: 12px;
    color: #008ac9;
    cursor: pointer;
`;

const FormContainer = styled.div`
    width: 50%;
    min-width: 250px;
`;

const FieldContainer = styled.div`
    margin-top: 12px;
`;

const Message = styled.span`
    margin: 12px;
    color: #394372;
    cursor: pointer;
`;

const Error = styled.span`
    margin: 12px;
    color: red;
    cursor: pointer;
`;

const mapStateToProps = (state: RootState) => ({
    error: state.error.effects.authentication.forgotPassword,
    isEmailSending: state.loading.effects.authentication.forgotPassword
});

const mapDispatchToProps = (dispatch: any) => ({
    forgotPassword: (email: string) => dispatch.authentication.forgotPassword(email)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
