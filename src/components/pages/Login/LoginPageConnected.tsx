import React from 'react';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../state/store/store';
import { PagesRoutes } from '../../../routing/PagesRoutes';
import { authenticationSelectors } from '../../../state/ducks/authentication/selectors';

export type LoginPageConnectedProps = RouteComponentProps & {
    showLoader: boolean;
    error: string;
    login: (username: string, password: string, recaptchaToken?: string) => void;
    isLoggedin: boolean;
};

const LoginPageConnected = ({ showLoader, error, login, isLoggedin, match }: LoginPageConnectedProps) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return isLoggedin ? (
        <Redirect to={urlParams.get('refer') || PagesRoutes.Home} />
    ) : (
        <LoginPage error={error} login={login} showLoader={showLoader} match={match} />
    );
};

const mapStateToProps = (state: RootState) => ({
    showLoader: state.loading.effects.authentication.loginAsync,

    error: authenticationSelectors.loginError(state),
    isLoggedin: authenticationSelectors.isAuthentication(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string, recaptchaToken?: string) => dispatch.authentication.loginAsync({ username, password, recaptchaToken })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPageConnected));
