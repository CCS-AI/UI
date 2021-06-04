import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PagesRoutes } from './PagesRoutes';
import Authentication from '../authentication/authentication';
import Layout from '../components/shared/Layout/Layout';
import { connect } from 'react-redux';
import { RootState } from '../state/store/store';
import { authenticationSelectors } from '../state/ducks/authentication/selectors';
import Loader from '../components/shared/SmallComponents/Loader';
import UserGuard from '../components/shared/guards/UserGuard';

const AuthRoute = ({ token, refreshToken, refreshTokenError, component, fetchUserInfoLoader, ...rest }: any) => {
    let loginRefer = PagesRoutes.Login;
    if (rest.location.pathname !== '/') {
        loginRefer += `?refer=${encodeURIComponent(rest.location.pathname + rest.location.search)}`;
    }
    useEffect(() => {
        if (!token) refreshToken();
    }, [token, refreshTokenError, refreshToken]);
    const Component = component;
    return (
        <>
            {!token && refreshTokenError && <Redirect to={loginRefer} />}
            <Route
                {...rest}
                render={(props) => {
                    if (token) {
                        Authentication.SetToken(token);
                        return (
                            <Layout>
                                {fetchUserInfoLoader ? (
                                    <Loader center />
                                ) : (
                                    <UserGuard>
                                        <Component {...props} />
                                    </UserGuard>
                                )}
                            </Layout>
                        );
                    } else return null;
                }}
            />
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    token: authenticationSelectors.token(state),
    refreshTokenError: !!state.error.effects.authentication.refreshToken,
    fetchUserInfoLoader: state.loading.effects.user.fetchUserInfo
});
const mapDispatchToProps = (dispatch: any) => ({
    refreshToken: dispatch.authentication.refreshToken
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
