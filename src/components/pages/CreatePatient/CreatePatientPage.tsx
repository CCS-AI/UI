import React from 'react';
import { RootState } from '../../../state/store/store';
import CreatePatientForm from './components/CreatePatientForm';
import { connect } from 'react-redux';
import { Patient } from '../../../models/entities/patient';
import { authenticationSelectors } from '../../../state/ducks/authentication/selectors';
import { FlexPageContainer } from '../../shared/styled/styled';

type CreatePatientProps = {
    showLoader: boolean;
    error: string;
    createPatient: (patient: Patient) => void;
};

const CreatePatientPage = ({ showLoader, error, createPatient }: CreatePatientProps) => {
    return (
        <FlexPageContainer>
            <CreatePatientForm showLoader={showLoader} error={error} createPatient={createPatient} />
        </FlexPageContainer>
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
