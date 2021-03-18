import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoginPageConnected from './components/pages/Login/LoginPageConnected';
import { PagesRoutes } from './routing/PagesRoutes';
import AuthRoute from './routing/AuthRoute';
import { connect } from 'react-redux';
import { RootState } from './state/store/store';
import ExceptionPage from './components/pages/ExceptionPage/ExceptionPage';
import ShowAllPatietns from './components/pages/ShowPatients/ShowAllPatietns';

type Props = {};

const Routes = ({}: Props) => {
    // const noFeatureComp = () => <ExceptionPage status={404} title="Doesn't have access to this feature" />;

    return (
        <>
            <Switch>
                <AuthRoute component={<div>Home</div>} exact path={PagesRoutes.Home} />
                <AuthRoute component={ShowAllPatietns} path={PagesRoutes.Patients} />
                <Route path={PagesRoutes.Login}>
                    <LoginPageConnected />
                </Route>
                <Route component={() => <ExceptionPage />} path={PagesRoutes.Error} />
                <Redirect to={PagesRoutes.Error} />
            </Switch>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
