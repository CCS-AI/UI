import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../state/store/store';
import { Patient } from '../../../models/entities/patient';
import { patientSelector } from '../../../state/ducks/patient/selectors';
import { PatientTableWithSearch } from './TableWithSearch';
import UserGuard from '../../../sdk/guards/UserGuard';
import Loader from '../../shared/SmallComponents/Loader';

export type ShowAllPatientsProps = RouteComponentProps & {
    patients: Patient[] | undefined;
    fetchPatients: () => Promise<Patient[]>;
    showLoader: boolean;
};

const ShowAllPatients = ({ patients, fetchPatients, showLoader }: ShowAllPatientsProps) => {
    useEffect(() => {
        fetchPatients();
    }, []);

    // if (!patients || !patients.length) {
    //     return <div>no patients</div>;
    // }

    return showLoader ? (
        <Loader showText={false} />
    ) : !patients || !patients.length ? (
        <div>No patients</div>
    ) : (
        <PatientTableWithSearch rows={patients} columns={Object.keys(patients[0])} pageSize={5}></PatientTableWithSearch>
    );
};

const mapStateToProps = (state: RootState) => ({
    patients: patientSelector.patientInfo(state),
    showLoader: state.loading.effects.patient.fetchAllPatients
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatients: () => dispatch.patient.fetchAllPatients()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowAllPatients));
