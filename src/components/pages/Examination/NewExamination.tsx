import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateExamination from './CreateExamination';

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

const NewExamination = ({ open, setOpen }: Props) => {
    const classes = useStyles();
    function handleClose() {
        setOpen(false);
    }
    return (
        <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
            <h3 style={{ margin: '20px' }} id="max-width-dialog-title">
                יצירת בדיקה חדשה
            </h3>
            <DialogContent>
                <CreateExamination />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    סגירה
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default NewExamination;
