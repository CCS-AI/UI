import React from 'react';
import { RootState } from '../../../state/store/store';
import RegisterExaminerForm from './components/RegisterExaminerForm';
import { connect } from 'react-redux';
import { Examiner } from '../../../models/entities/examiner';
import { authenticationSelectors } from '../../../state/ducks/authentication/selectors';

type RegisterExaminerProps = {
    showLoader: boolean;
    error: string;
    registerExaminer: (examiner: Examiner) => void;
};

const RegisterExaminerPage = ({ showLoader, error, registerExaminer }: RegisterExaminerProps) => {
    return <RegisterExaminerForm showLoader={showLoader} error={error} registerExaminer={registerExaminer} />;
};
const mapStateToProps = (state: RootState) => ({
    showLoader: state.loading.effects.authentication.loginAsync,
    error: authenticationSelectors.loginError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    registerExaminer: (examiner: Examiner) => dispatch.examiner.registerExaminer(examiner)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExaminerPage);
