import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, match } from 'react-router-dom';
import Loader, { BtnLoader } from '../../../shared/SmallComponents/Loader';
import { Checkbox } from '../../../shared/inputs/base';
import { FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { loginSchema } from '../../../../validationSchemas/loginForm';
import loadScript from '../../../../utils/loadScript';
import { Button, Avatar, CssBaseline, Paper, Box, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import loginBG from '../../../../static/images/hearingbg.jpeg';
import ccsLogo from '../../../../static/images/ccs-logo.png';
import { RoundedButton } from '../../../shared/form/StyledFormShared';

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
        backgroundImage: `url(${loginBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0.2px) brightness(1.1) hue-rotate(5deg) opacity(0.9) saturate(1.3) sepia(0.4)'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

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
                            <Grid item xs={false} sm={4} md={7} className={classes.image} />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        כניסה
                                    </Typography>
                                    <Form className={classes.form} noValidate>
                                        <FormTextInput required label="איימיל" name="email" autoFocus />
                                        <FormTextInput required name="password" label="סיסמא" type="password" />
                                        <Checkbox value="remember" color="primary" text="זכור אותי" />
                                        <Footer>
                                            <RoundedButton type="submit" variant="contained" color="primary" size="large" className={classes.submit}>
                                                {showLoader || generatingCaptcha ? <BtnLoader /> : <span>{'התחברות'}</span>}
                                            </RoundedButton>
                                        </Footer>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link to={'/forgotpwd'}>שכחת סיסמא?</Link>
                                            </Grid>
                                            <Grid item>
                                                <Link to={'/register'}>{'אין לך משתמש? לחץ כאן כדי ליצור'}</Link>
                                            </Grid>
                                        </Grid>

                                        <ErrorMsg>{error}</ErrorMsg>
                                        <Box mt={5} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <Copyright />
                                            <img width={200} style={{ marginTop: '25px' }} src={ccsLogo} alt="CCS" />
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

const Footer = styled.div`
    display: flex;
    justify-content: center;
`;
export default LoginForm;
