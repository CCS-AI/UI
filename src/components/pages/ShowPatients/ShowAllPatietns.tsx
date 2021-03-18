import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../state/store/store';
import { Patient } from '../../../models/entities/patient';
import { keys } from 'ts-transformer-keys';
import { patientSelector } from '../../../state/ducks/patient/selectors';

export type ShowAllPatientsProps = RouteComponentProps & {
    patients: Patient[] | undefined;
    fetchPatients: () => void;
};

const ShowAllPatietns = ({ patients }: ShowAllPatientsProps) => {
    // get all patients keys as string array
    const keysOfPatient = keys<Patient>();
    const patientsFields: any[] = keysOfPatient.map((key) => {
        {
            field: key;
        }
    });

    return <h1>d</h1>;
};

const mapStateToProps = (state: RootState) => ({
    patients: patientSelector.patientInfo(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatients: () => dispatch.patient.fetchAllPatients()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowAllPatietns));
