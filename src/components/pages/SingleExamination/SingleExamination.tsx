import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory, Link } from 'react-router-dom';
import { RootState } from '../../../state/store/store';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { TableCard, TableHeader } from '../../shared/form/StyledFormShared';
import { PatientMedicalFile } from '../../../models/entities/pmf';
import { patientMedicalFileSelector } from '../../../state/ducks/patientMedicalfile/selectors';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonalDetails, { BoxContainer, Title, Value, detailNullMessage } from '../PatientMedicalFile/components/PersonalDetails';
import { Examination } from '../../../models/entities/examination';
import { examinationSelector } from '../../../state/ducks/examination/selectors';
import { PagesRoutes } from '../../../routing/PagesRoutes';
import patient from '../../../sdk/controllers/patient/patient';
import { formatHebDate } from '../../../utils/date';
import { Exam } from '../Examination/CreateExamination';
import { SelectPointType } from '../Examination/PointType';
import { SpeechAudiometryDetails } from '../SpeechAudiometry';
import { TextBox } from '../Examination/TextBox';
import { TextArea } from './components/TextArea';

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
        <Button color="secondary" variant="outlined" style={{ width: 'auto', ...style }} startIcon={<AddIcon />} onClick={() => window.print()}>
            הדפסה
        </Button>
    );
    return (
        <FlexPageContainer>
            <TableCard>
                {showLoader ? (
                    <Loader />
                ) : !examinationInfo ? (
                    <div>No Examination</div>
                ) : (
                    <>
                        <TableHeader>תוצאות בדיקת שמיעה</TableHeader>
                        <>{CreateBtn({ display: 'flex', margin: '5px auto 5px 0' })}</>
                        <br />
                        <Link to={{}} onClick={() => history.goBack()} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <span className="material-icons">chevron_right</span>
                            <span style={{ textDecoration: 'underline' }}>חזור לצפייה בתיק הרפואי </span>
                        </Link>
                        <BoxContainer>
                            <Title>תאריך הבדיקה:</Title>
                            <Value>{examinationInfo.createdAt ? ' ' + formatHebDate(examinationInfo.createdAt) : detailNullMessage}</Value>
                        </BoxContainer>
                        {examinationInfo.info ? (
                            <div className={'point-type-container'}>
                                <Exam data={examinationInfo.info} width={1000} height={800} />
                            </div>
                        ) : (
                            <h3> נתוני גרף הבדיקה לא קיימים במערכת</h3>
                        )}
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '50%', marginLeft: '30px' }}>
                                <SpeechAudiometryDetails data={examinationInfo.speechAudiometry} setSpInfo={() => {}} />
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%'
                                }}
                            ></div>

                            <h3>סיכום והמלצות</h3>
                            <TextArea
                                deafultVal={examinationInfo.patientTestBackground ? examinationInfo.patientTestBackground : detailNullMessage}
                                width="50%"
                                rows={19}
                            />
                        </div>
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
