import React, { useEffect, useState } from 'react';
import { match, Link, Redirect, withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FormTextInput } from '../../../shared/inputs/form';
import Loader from '../../../shared/SmallComponents/Loader';
import { styled } from '../../../shared/Theme/theme';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/store/store';
import { Button } from '@material-ui/core';

type PathParams = {
    token: string;
};

type ResetPasswordFormProps = RouteComponentProps<PathParams> & {
    isCheckingResetToken: boolean;
    isResetPassword: boolean;
    isResetPasswordTokenValid: (token: string) => boolean;
    resetPassword: (token: string, password: string, passwordConfirm: string) => void;
    localization: any;
    match: match;
    error: string;
};

const ResetPasswordForm = ({
    isCheckingResetToken,
    isResetPassword,
    isResetPasswordTokenValid,
    resetPassword,
    localization,
    match,
    error
}: ResetPasswordFormProps) => {
    const [isValidToken, setIsValidToken] = useState(true);

    const history = useHistory();

    const handleOnResetPassword = async (password: string, passwordConfirm: string) => {
        try {
            await resetPassword(match.params.token, password, passwordConfirm);
            history.push('/login');
        } catch {}
    };

    useEffect(() => {
        async function setIsValid() {
            setIsValidToken(await isResetPasswordTokenValid(match.params.token));
        }
        setIsValid();
        return () => {};
    }, []);
    return !isValidToken ? (
        <Redirect to="/login" />
    ) : (
        <>
            <WelcomeMessage>{localization.welcome_msg}</WelcomeMessage>
            <Formik
                initialValues={{ password: '', passwordConfirm: '' }}
                // validationSchema={resetPasswordSchema(localization)}
                onSubmit={({ password, passwordConfirm }) => {
                    handleOnResetPassword(password, passwordConfirm);
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid, dirty } = formik;
                    return (
                        <FormContainer>
                            <Form>
                                <FieldContainer style={{ marginBottom: errors.password && touched.password ? '20px' : '12px' }}>
                                    <FormTextInput name="password" placeHolder={localization.new_pwd} style={{ height: '40px' }} />
                                </FieldContainer>
                                <FieldContainer style={{ marginBottom: errors.passwordConfirm && touched.passwordConfirm ? '20px' : '12px' }}>
                                    <FormTextInput name="passwordConfirm" placeHolder={localization.confirm_pwd} style={{ height: '40px' }} />
                                </FieldContainer>
                                <Button type="submit" disabled={!(dirty && isValid)}>
                                    {isResetPassword ? (
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

            <Link to={`/login`}>
                <ForgetPWText>{localization.login}</ForgetPWText>
            </Link>
            <Error>{error}</Error>
            <PasswordRequirmentsTitle>{localization.password_requirments_title}</PasswordRequirmentsTitle>
            <PasswordRequirments>{localization.password_requirments}</PasswordRequirments>
        </>
    );
};

const WelcomeMessage = styled.div`
    font-weight: bold;
`;
const FormContainer = styled.div`
    width: 50%;
    min-width: 250px;
`;

const FieldContainer = styled.div`
    margin-top: 12px;
`;
const PasswordRequirments = styled.div`
    white-space: pre-wrap;
    text-align: left;
`;
const PasswordRequirmentsTitle = styled.div`
    font-weight: bold;
    text-align: left;
`;
const ForgetPWText = styled.span`
    margin: 12px;
    color: #008ac9;
    cursor: pointer;
`;

const Error = styled.span`
    margin: 12px;
    color: red;
    cursor: pointer;
`;

const mapStateToProps = (state: RootState) => ({
    error: state.error.effects.authentication.resetPassword,
    isResetPassword: state.loading.effects.authentication.resetPassword,
    isCheckingResetToken: state.loading.effects.authentication.isResetPasswordTokenValid
});

const mapDispatchToProps = (dispatch: any) => ({
    resetPassword: (token: string, password: string, passwordConfirm: string) =>
        dispatch.authentication.resetPassword({ token, password, passwordConfirm }),
    isResetPasswordTokenValid: (token: string) => dispatch.authentication.isResetPasswordTokenValid(token)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm));
