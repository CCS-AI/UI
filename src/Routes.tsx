import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoginPageConnected from './components/pages/Login/LoginPageConnected';
import { PagesRoutes } from './routing/PagesRoutes';
import AuthRoute from './routing/AuthRoute';
import { connect } from 'react-redux';
import { RootState } from './state/store/store';
import ExceptionPage from './components/pages/ExceptionPage/ExceptionPage';
import CreatePatientPage from './components/pages/CreatePatient/CreatePatientPage';
import RegisterExaminerPage from './components/pages/RegisterExaminer/RegisterExaminerPage';
import Home from './components/pages/Home';
import ShowAllPatients from './components/pages/ShowPatients/ShowAllPatietns';

type Props = {};

const Routes = ({}: Props) => {
    // const noFeatureComp = () => <ExceptionPage status={404} title="Doesn't have access to this feature" />;

    return (
        <>
            <Switch>
                <AuthRoute component={CreatePatientPage} exact path={PagesRoutes.CreatePatient} />
                <AuthRoute component={RegisterExaminerPage} exact path={PagesRoutes.RegisterExaminer} />
                <AuthRoute component={ShowAllPatients} path={PagesRoutes.Patients} />
                <AuthRoute component={Home} exact path={PagesRoutes.Home} />
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
