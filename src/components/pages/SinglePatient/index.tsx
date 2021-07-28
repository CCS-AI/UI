import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory, Link } from 'react-router-dom';
import { RootState } from '../../../state/store/store';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { TableCard, TableHeader } from '../../shared/form/StyledFormShared';
import { PatientMedicalFile } from '../../../models/entities/pmf';
import { patientMedicalFileSelector } from '../../../state/ducks/patientMedicalfile/selectors';
import { ExaminationsTable } from '../PatientMedicalFile/components/ExaminationsResults';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonalDetails from '../PatientMedicalFile/components/PersonalDetails';
import { PagesRoutes } from '../../../routing/PagesRoutes';
import NewExamination from '../Examination/NewExamination';

export type ShowAllPatientsProps = RouteComponentProps<{ patientId: string }> & {
    patientMedicalFileInfo?: PatientMedicalFile;
    showLoader: boolean;
    fetchPatientMedicalFile: (patientId: string) => void;
};

const SinglePatient = ({ fetchPatientMedicalFile, patientMedicalFileInfo, showLoader, match }: ShowAllPatientsProps) => {
    const [newExamOpen, setNewExamOpen] = useState(false);
    useEffect(() => {
        fetchPatientMedicalFile(match.params.patientId);
    }, [fetchPatientMedicalFile, match.params.patientId]);
    const CreateBtn = (style?: React.CSSProperties) => (
        <Button color="secondary" variant="outlined" style={{ width: 'auto', ...style }} startIcon={<AddIcon />} onClick={() => setNewExamOpen(true)}>
            יצירת בדיקה
        </Button>
    );
    return (
        <FlexPageContainer>
            <TableCard>
                {showLoader ? (
                    <Loader />
                ) : !patientMedicalFileInfo ? (
                    <div>No Patient</div>
                ) : (
                    <>
                        <NewExamination open={newExamOpen} setOpen={setNewExamOpen} />
                        <TableHeader>תיק רפואי</TableHeader>
                        <br />
                        <Link to={{ pathname: PagesRoutes.Patients }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <span className="material-icons">chevron_right</span>
                            <span style={{ textDecoration: 'underline' }}>חזור לצפייה במטופלים</span>
                        </Link>
                        <br />
                        <PersonalDetails patient={patientMedicalFileInfo.patient} />
                        <br />
                        {patientMedicalFileInfo.examinations && patientMedicalFileInfo.examinations.length ? (
                            <>
                                {CreateBtn({ display: 'flex', margin: '5px auto 5px 0' })}
                                <ExaminationsTable
                                    examinationsRows={patientMedicalFileInfo.examinations}
                                    columns={Object.keys(patientMedicalFileInfo.examinations[0])}
                                    pageSize={patientMedicalFileInfo.examinations.length}
                                />
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div>לא קיימות בדיקות</div>
                                {CreateBtn()}
                            </div>
                        )}
                    </>
                )}
            </TableCard>
        </FlexPageContainer>
    );
};
const mapStateToProps = (state: RootState) => ({
    patientMedicalFileInfo: patientMedicalFileSelector.patientMedicalFileInfo(state),
    showLoader: state.loading.effects.patientMedicalFile.fetchPatientMedicalFile
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatientMedicalFile: (patientId: string) => dispatch.patientMedicalFile.fetchPatientMedicalFile(patientId)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePatient));
