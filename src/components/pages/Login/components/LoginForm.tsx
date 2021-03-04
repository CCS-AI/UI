import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { match, Link } from 'react-router-dom';
import Loader from '../../../shared/SmallComponents/Loader';
import { Checkbox } from '../../../shared/inputs/base';
import { FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { loginSchema } from '../../../../validationSchemas/loginForm';
import loadScript from '../../../../utils/loadScript';
import { Button } from '@material-ui/core';

declare global {
    interface Window {
        captchaOnLoad: () => void;
        grecaptcha: ReCaptchaInstance;
    }
}

interface ReCaptchaInstance {
    ready: (cb: () => any) => any;
    execute: (options: ReCaptchaExecuteOptions) => Promise<string>;
    render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaExecuteOptions {
    action: string;
}

interface ReCaptchaRenderOptions {
    sitekey: string;
    size: 'invisible';
}

interface Props {
    action: string;
    children: (props: CaptchaProps) => React.ReactNode;
}

interface CaptchaProps {
    isReady: boolean;
    execute: () => Promise<string>;
}

type LoginPageProps = {
    showLoader: boolean;
    error: string;
    login: (email: string, password: string, recaptchaToken?: string) => void;
    match: match;
};

const LoginForm = ({ showLoader, error, login, match }: LoginPageProps) => {
    const [isCaptchaReady, setIsCaptchaReady] = useState(false);
    const [generatingCaptcha, setGeneratingCaptcha] = useState(false);
    const [rememberMe, setRememberme] = useState(!!localStorage.getItem('rememberMe') || false);

    let recaptchaBadge: HTMLDivElement;

    useEffect(() => {
        window.captchaOnLoad = onLoadRecaptcha;
        loadScript('recaptcha-script', `https://www.google.com/recaptcha/api.js?onload=captchaOnLoad&render=explicit`);

        return () => {
            if (recaptchaBadge) {
                document.body.removeChild(recaptchaBadge);
            }
        };
    }, []);

    const onLoadRecaptcha = (): void => {
        const badge = document.createElement('div');
        badge.id = 'g-recaptcha';
        recaptchaBadge = document.body.appendChild(badge);

        if (process.env.REACT_APP_RECAPTCHA_SITE_KEY) {
            window.grecaptcha.render('g-recaptcha', {
                sitekey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
                size: 'invisible'
            });
        }

        window.grecaptcha.ready(() => {
            setIsCaptchaReady(true);
        });
    };
    const initialValues = {
        email: localStorage.getItem('email') || '',
        password: localStorage.getItem('password') || ''
    };

    const submitLogin = (email: string, password: string) => {
        if (rememberMe) {
            setLocalStorage(email, password, rememberMe);
        } else {
            clearLocalStorage();
        }
        login(email, password);
        setGeneratingCaptcha(true);
        if (isCaptchaReady) {
            if (process.env.REACT_APP_RECAPTCHA_SITE_KEY) {
                window.grecaptcha.execute({ action: 'submit' }).then((token) => {
                    setGeneratingCaptcha(false);
                    // login(email, password, token);
                });
            }
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema()}
                onSubmit={({ email, password }) => {
                    submitLogin(email.trim(), password);
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid } = formik;
                    return (
                        <FormContainer>
                            <Form>
                                <FormTextInput name="email" placeHolder={'איימיל'} style={{ height: '40px' }} />
                                <FormTextInput name="password" placeHolder={'סיסמא'} type="password" style={{ height: '40px' }} />
                                <Button variant="contained" type="submit" disabled={!isValid}>
                                    {showLoader || generatingCaptcha ? (
                                        <Loader width="20px" marginTop="0px" showText={false} />
                                    ) : (
                                        <span>{'התחברות'}</span>
                                    )}
                                </Button>
                            </Form>
                        </FormContainer>
                    );
                }}
            </Formik>
        </>
    );
};

function setLocalStorage(email: string, password: string, rememberMe: boolean) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('rememberMe', rememberMe.toString());
}
function clearLocalStorage() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
}

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

export default LoginForm;
