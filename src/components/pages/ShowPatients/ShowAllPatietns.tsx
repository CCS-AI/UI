import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {RootState} from '../../../state/store/store';
import {Patient} from '../../../models/entities/patient';
import {patientSelector} from '../../../state/ducks/patient/selectors';
import {PatientTableWithSearch} from './TableWithSearch'


export type ShowAllPatientsProps = RouteComponentProps & {
    patients: Patient[] | undefined;
    fetchPatients: () => Promise<Patient[]>;
};

const ShowAllPatients = ({patients, fetchPatients}: ShowAllPatientsProps) => {
    useEffect(() => {
        fetchPatients()
    }, [])

    if (!patients || !patients.length) {
        return <div>no patients</div>
    }

    return <PatientTableWithSearch rows={patients} columns={Object.keys(patients[0])} pageSize={5}></PatientTableWithSearch>
}


const mapStateToProps = (state: RootState) => ({
    patients: patientSelector.patientInfo(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatients: () => dispatch.patient.fetchAllPatients()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowAllPatients));
