import React from 'react';
import { RootState } from '../../../state/store/store';
import RegisterExaminerForm from './components/RegisterExaminerForm';
import { connect } from 'react-redux';
import { Link, match } from 'react-router-dom';
import { Examiner } from '../../../models/entities/examiner';
import { authenticationSelectors } from '../../../state/ducks/authentication/selectors';

type RegisterExaminerProps = {
    showLoader: boolean;
    error: string;
    registerExaminer: (examiner: Examiner) => void;
    match: match;
};

const RegisterExaminerPage = ({ showLoader, error, registerExaminer, match }: RegisterExaminerProps) => {
    return (
        <div>
            <RegisterExaminerForm
                showLoader={showLoader}
                error={error}
                registerExaminer={registerExaminer}
                match={match}
                /** here send props you need */
            />
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    showLoader: state.loading.effects.authentication.loginAsync,
    error: authenticationSelectors.loginError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    registerExaminer: (examiner: Examiner) => dispatch.patient.registerExaminer(examiner)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExaminerPage);
