import React from 'react';
import { RootState } from '../../../state/store/store';
import CreatePatientForm from './components/CreatePatientForm';
import { connect } from 'react-redux';
import { Patient } from '../../../models/entities/patient';
import { authenticationSelectors } from '../../../state/ducks/authentication/selectors';
import { FlexPageContainer } from '../../shared/styled/styled';
import { patientSelector } from '../../../state/ducks/patient/selectors';

type CreatePatientProps = {
    showLoader: boolean;
    createPatient: (patient: Patient) => Promise<boolean>;
};

const CreatePatientPage = ({ showLoader, createPatient }: CreatePatientProps) => {
    return (
        <FlexPageContainer>
            <CreatePatientForm showLoader={showLoader} createPatient={createPatient} />
        </FlexPageContainer>
    );
};
const mapStateToProps = (state: RootState) => ({
    showLoader: state.loading.effects.patient.createPatient
});

const mapDispatchToProps = (dispatch: any) => ({
    createPatient: (patient: Patient) => dispatch.patient.createPatient(patient)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatientPage);
