import React from 'react';
import { RootState } from '../../../state/store/store';
import CreatePatientForm from './components/CreatePatientForm';
import { connect } from 'react-redux';
import { Link, match } from 'react-router-dom';
import { Patient } from '../../../models/entities/patient';
import { authenticationSelectors } from '../../../state/ducks/authentication/selectors';

type CreatePatientProps = {
    showLoader: boolean;
    error: string;
    createPatient: (patient: Patient) => void;
    match: match;
};

const CreatePatientPage = ({ showLoader, error, createPatient, match }: CreatePatientProps) => {
    return (
        <div>
            <CreatePatientForm
                showLoader={showLoader}
                error={error}
                createPatient={createPatient}
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
    createPatient: (patient: Patient) => dispatch.patient.createPatient(patient)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatientPage);
