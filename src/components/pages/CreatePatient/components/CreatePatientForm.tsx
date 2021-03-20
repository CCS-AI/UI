import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, match } from 'react-router-dom';
import Loader from '../../../shared/SmallComponents/Loader';
import { Checkbox } from '../../../shared/inputs/base';
import { FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { loginSchema } from '../../../../validationSchemas/loginForm';
import loadScript from '../../../../utils/loadScript';
import { Button, CssBaseline, Paper, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StaticDateTimePicker from '../../../shared/StaticDateTimePicker/StaticDateTimePicker';

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
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        // backgroundImage: `url(${loginBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const CreatePatientForm = ({ showLoader, error, login, match }: LoginPageProps) => {
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
    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                Communication clinical system {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    };

    const classes = useStyles();
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
                        <Grid container component="main" className={classes.root}>
                            <CssBaseline />
                            <Grid item xs={false} sm={4} md={4} className={classes.image} />
                            <Grid item xs={12} sm={4} md={4} component={Paper} elevation={6} square>
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h4">
                                        הוספת מטופל חדש למערכת
                                    </Typography>
                                    <Form className={classes.form} noValidate>
                                        <FormTextInput required label="שם פרטי" name="email" autoFocus />
                                        <FormTextInput required label="שם משפחה" name="email" autoFocus />
                                        <FormTextInput required label="תעודת זהות" name="email" autoFocus />
                                        <FormTextInput required label="אימייל" name="email" autoFocus />
                                        <FormTextInput required label="מין" name="email" autoFocus />
                                        <FormTextInput required label="תאריך לידה" name="email" type="date" fullWidth={false} />
                                        <FormTextInput required label="מספר טלפון" name="email" autoFocus />
                                        <FormTextInput required label="מספר טלפון נוסף" name="email" autoFocus />
                                        <FormTextInput required label="קופת חולים" name="email" autoFocus />
                                        <Typography component="h1" variant="h5">
                                            כתובת
                                        </Typography>
                                        <FormTextInput required label="עיר" name="email" autoFocus />
                                        <FormTextInput required label="מספר רחוב" name="email" autoFocus />
                                        <FormTextInput required label="מספר בית" name="email" autoFocus />
                                        <FormTextInput required label="מספר דירה" name="email" autoFocus />
                                        {/* <FormTextInput required name="קופת חולים" label="סיסמא" type="password" /> */}
                                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                            {showLoader || generatingCaptcha ? (
                                                <Loader width="20px" marginTop="0px" showText={false} />
                                            ) : (
                                                <span>{'הוספה'}</span>
                                            )}
                                        </Button>
                                        <ErrorMsg>{error}</ErrorMsg>
                                        <Box mt={5}>
                                            <Copyright />
                                        </Box>
                                    </Form>
                                </div>
                            </Grid>
                        </Grid>
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

const ErrorMsg = styled.div`
    color: red;
    text-align: center;
`;
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

export default CreatePatientForm;
