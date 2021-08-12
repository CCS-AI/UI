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
import { Filter } from '../../../models/entities/filter';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
const FilterData = ({ open, setOpen }: Props) => {
    const [questionnaireResInfo, setQuestionnaireResInfo] = useState<QuestionnaireResult>();
    const [wizardMode, setWizardMode] = useState<wizardModeType>('FILTER-QUESTIONNAIRE');
    function handleClose() {
        setOpen(false);
    }
    function handleSetQuestionnaire(result: QuestionnaireResult) {
        setQuestionnaireResInfo(result);
        setWizardMode('FILTER-EXAMINATION');
    }
    const submitFilter = () => {
        const filter: Filter = {
            questionnaireResults: questionnaireResInfo
        } as Filter;
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
                ></RoundedButton>
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
                <span>{'שמירה'}</span>
                {/* {showLoader ? <BtnLoader /> : <span>{'שמירה'}</span>} */}
            </DialogContent>
        </Dialog>
    );
};
export default FilterData;
