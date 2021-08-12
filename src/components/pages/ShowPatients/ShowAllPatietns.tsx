import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../state/store/store';
import { Patient } from '../../../models/entities/patient';
import { patientSelector } from '../../../state/ducks/patient/selectors';
import { PatientTableWithSearch } from './TableWithSearch';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { styled } from '../../shared/Theme/theme';
import { TableCard, TableHeader } from '../../shared/form/StyledFormShared';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Filter } from '../../../models/entities/filter';
import FilterData from './FilterData';

export type ShowAllPatientsProps = RouteComponentProps & {
    patients: Patient[] | undefined;
    fetchPatients: (filter: Filter | undefined) => Promise<Patient[]>;
    showLoader: boolean;
};

const ShowAllPatients = ({ patients, fetchPatients, showLoader }: ShowAllPatientsProps) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterData, setFilterData] = useState<Filter | undefined>();
    useEffect(() => {
        fetchPatients(undefined);
    }, []);
    const CreateBtn = (style?: React.CSSProperties) => (
        <Button color="secondary" variant="outlined" style={{ width: 'auto', ...style }} startIcon={<AddIcon />} onClick={() => setFilterOpen(true)}>
            חתכים נוספים
        </Button>
    );
    return (
        <FlexPageContainer>
            <TableCard>
                {showLoader ? (
                    <Loader />
                ) : !patients || !patients.length ? (
                    <div>No patients</div>
                ) : (
                    <>
                        <TableHeader>צפייה במטופלים</TableHeader>
                        <br />
                        <br />
                        {CreateBtn({ display: 'flex', margin: '5px auto 5px 0' })}
                        {/* <FilterData open={filterOpen} setOpen={setFilterOpen} setFilterData={setFilterData} fetchPatients={fetchPatients} /> */}
                        <FilterData open={filterOpen} setOpen={setFilterOpen} setFilterData={setFilterData} />
                        <PatientTableWithSearch rows={patients} columns={Object.keys(patients[0])} pageSize={5}></PatientTableWithSearch>
                    </>
                )}
            </TableCard>
        </FlexPageContainer>
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
