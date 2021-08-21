import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import QuestionnaireForm from '../QuestionnaireForm';
import { QuestionnaireResult } from '../../../models/entities/questionnaire';
import { Patient } from '../../../models/entities/patient';
import { RoundedButton } from '../../shared/form/StyledFormShared';
import SaveIcon from '@material-ui/icons/Save';
import { BtnLoader } from '../../shared/SmallComponents/Loader';
import { ExaminationFilterResult, Filter, PatientFilterDetails } from '../../../models/entities/filter';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../state/store/store';
import { patientSelector } from '../../../state/ducks/patient/selectors';
import { forEach } from 'lodash';
import { questionnaireSelector } from '../../../state/ducks/questionnaire/selectors';
type Props = RouteComponentProps & {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchPatients: (filter: Filter | undefined) => Promise<Patient[]>;
};

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120
    },
    formControlLabel: {
        marginTop: theme.spacing(1)
    }
}));
type wizardModeType = 'FILTER-QUESTIONNAIRE' | 'FILTER-EXAMINATION';
const FilterData = ({ open, setOpen, fetchPatients }: Props) => {
    const [questionnaireResInfo, setQuestionnaireResInfo] = useState<QuestionnaireResult>();
    const [patientFilterDetails, setPatientFilterDetails] = useState<PatientFilterDetails>();
    const [examinationFilterResult, seExaminationFilterResult] = useState<ExaminationFilterResult>();
    const [wizardMode, setWizardMode] = useState<wizardModeType>('FILTER-QUESTIONNAIRE');
    const [showLoader, setLoader] = useState(false);

    const handleClose = () => {
        setLoader(true);
        const filter = {
            filter: {
                questionnaireResults: questionnaireResInfo,
                patientDetails: patientFilterDetails,
                examinationResult: examinationFilterResult
            }
        } as Filter;
        fetchPatients(filter)
            .then((res) => {})
            .finally(() => {
                setLoader(false);
                setOpen(false);
            });
    };

    function handleSetQuestionnaire(result: QuestionnaireResult) {
        let questionnaireResFilter: QuestionnaireResult = [];
        result.forEach((question) => {
            if (question.answers && question.answers.length > 0) {
                questionnaireResFilter.push(question);
            }
        });
        setQuestionnaireResInfo(questionnaireResFilter);
        setWizardMode('FILTER-EXAMINATION');
    }
    const submitFilter = () => {
        return (
            <div>
                <h3>FILTER-EXAMINATION</h3>
                <RoundedButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={handleClose}
                    disabled={undefined}
                >
                    {showLoader ? <BtnLoader /> : <span>{'שמירה'}</span>}
                </RoundedButton>
            </div>
        );
    };

    return (
        <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: '20px' }} id="max-width-dialog-title">
                    הוספת חתכים נוספים לחיפוש
                </h3>
                <div>
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <DialogContent style={{ minHeight: '500px' }}>
                {wizardMode === 'FILTER-QUESTIONNAIRE' && <QuestionnaireForm setQuestionnaireResInfo={handleSetQuestionnaire} />}
                {wizardMode === 'FILTER-EXAMINATION' && submitFilter()}
            </DialogContent>
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatients: (filter: Filter | undefined) => dispatch.patient.fetchAllPatients(filter)
});

export default withRouter(connect(null, mapDispatchToProps)(FilterData));
