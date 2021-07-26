import React, { useEffect } from 'react';
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
import { Examination } from '../../../models/entities/examination';
import { Patient } from '../../../models/entities/patient';
import { examinationSelector } from '../../../state/ducks/examination/selectors';

export type ShowSingleExaminationProps = RouteComponentProps<{ examinationId: string }> & {
    examinationInfo?: Examination;
    patientMedicalFileInfo?: PatientMedicalFile;
    showLoader: boolean;
    getExaminationById: (examinationId: string) => void;
};

const SingleExamination = ({ getExaminationById, examinationInfo, patientMedicalFileInfo, showLoader, match }: ShowSingleExaminationProps) => {
    const history = useHistory();
    useEffect(() => {
        getExaminationById(match.params.examinationId);
    }, [getExaminationById, match.params.examinationId]);
    const CreateBtn = (style?: React.CSSProperties) => (
        <Button color="secondary" variant="outlined" style={{ width: 'auto', ...style }} startIcon={<AddIcon />}>
            הדפסה
        </Button>
    );
    return (
        <FlexPageContainer>
            <TableCard>
                {showLoader ? (
                    <Loader />
                ) : !examinationInfo || !patientMedicalFileInfo ? (
                    <div>No Examination</div>
                ) : (
                    <>
                        <TableHeader>סיכום בדיקה</TableHeader>
                        <br />
                        <Link to={{}} onClick={() => history.goBack()} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <span className="material-icons">chevron_right</span>
                            <span style={{ textDecoration: 'underline' }}>חזור לצפייה בתיק הרפואי </span>
                        </Link>
                        <br />
                        <PersonalDetails patient={patientMedicalFileInfo?.patient} />
                        <br />
                        <>{CreateBtn({ display: 'flex', margin: '5px auto 5px 0' })}</>
                    </>
                )}
            </TableCard>
        </FlexPageContainer>
    );
};
const mapStateToProps = (state: RootState) => ({
    patientMedicalFileInfo: patientMedicalFileSelector.patientMedicalFileInfo(state),
    examinationInfo: examinationSelector.examinationInfo(state),
    showLoader: state.loading.effects.patientMedicalFile.fetchPatientMedicalFile
});

const mapDispatchToProps = (dispatch: any) => ({
    getExaminationById: (examinationId: string) => dispatch.examination.getExaminationById(examinationId)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleExamination));
