import React from 'react';
import { styled } from '../../shared/Theme/theme';
import { match, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';

type LoginPageProps = {
    showLoader: boolean;
    error: string;
    login: (username: string, password: string, recaptchaToken?: string) => void;
    match: match;
};

const LoginPage = React.memo(({ showLoader, error, login, match }: LoginPageProps) => {
    return (
        <React.Fragment>
            <LoginPageWrapper>
                <Switch>
                    <Route exact path={match.path}>
                        <LoginForm showLoader={showLoader} error={error} login={login} match={match} />
                    </Route>
                    {/* <Route exact path={`${match.path}/forgotPassword`}>
                            <ForgotPasswordForm localization={localization.forgot_pswd_form} match={match} />
                        </Route>
                        <Route exact path={`${match.path}/forgotPassword/:token`}>
                            <ResetPasswordForm localization={localization.reset_pswd_form} />
                        </Route> */}
                    <Redirect to="/" />
                </Switch>
            </LoginPageWrapper>
        </React.Fragment>
    );
});

const Div = styled.div`
    justify-content: center;
`;

const LoginPageWrapper = styled(Div)`
    min-height: 500px;
    display: flex;
    flex-direction: row;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const ForgetPWText = styled.span`
    margin: 12px;
    color: #008ac9;
    cursor: pointer;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    margin: 16px 0;
`;

export default LoginPage;
