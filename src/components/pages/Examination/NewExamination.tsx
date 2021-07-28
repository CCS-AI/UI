import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateExamination from './CreateExamination';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import QuestionnaireForm from '../QuestionnaireForm';
import { QuestionnaireResult } from '../../../models/entities/questionnaire';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pmfId: string;
    patientId: string;
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
type wizardModeType = 'QUESTIONNAIRE' | 'EXAMINATION';
const NewExamination = ({ open, setOpen, pmfId, patientId }: Props) => {
    const [questionnaireResInfo, setQuestionnaireResInfo] = useState<QuestionnaireResult>();
    const [wizardMode, setWizardMode] = useState<wizardModeType>('QUESTIONNAIRE');
    function handleClose() {
        setOpen(false);
    }
    function handleSetQuestionnaire(result: QuestionnaireResult) {
        setQuestionnaireResInfo(result);
        setWizardMode('EXAMINATION');
    }
    return (
        <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: '20px' }} id="max-width-dialog-title">
                    יצירת בדיקה חדשה
                </h3>
                <div>
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <DialogContent style={{ minHeight: '500px' }}>
                {wizardMode === 'QUESTIONNAIRE' && <QuestionnaireForm setQuestionnaireResInfo={handleSetQuestionnaire} />}
                {wizardMode === 'EXAMINATION' && (
                    <CreateExamination pmfid={pmfId} patientId={patientId} questionnaireResults={questionnaireResInfo} submitCallback={handleClose} />
                )}
            </DialogContent>
        </Dialog>
    );
};
export default NewExamination;
