import { Dialog } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Patient } from '../../../models/entities/patient';
import { patient } from '../../../state/ducks/patient/patient';
import { RootState } from '../../../state/store/store';
import { PatientMedicalFile } from '../../../models/entities/pmf';
import Loader from '../../shared/SmallComponents/Loader';
import PersonalDetails from './components/PersonalDetails';
import { patientMedicalFileSelector } from '../../../state/ducks/patientMedicalfile/selectors';
import { patientSelector } from '../../../state/ducks/patient/selectors';

type Props = {
    patientId: string;
    patientMedicalFile?: PatientMedicalFile; //TODO: change to this - PatientMedicalFile;
    fetchPatientMedicalFile: (patientId: string) => void;
};
/*
https://material-ui.com/components/dialogs/
*/
{
    /* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <PatientMedicalFile patientId={patientId} />
</Dialog> */
}

const PatientMedicalFileDetails = ({ patientId, patientMedicalFile, fetchPatientMedicalFile }: Props) => {
    useEffect(() => {
        fetchPatientMedicalFile(patientId);
    }, [patientId, patientMedicalFile]);
    return (
        <>
            {!patientMedicalFile ? (
                <div>
                    <h1>תיק רפואי</h1>
                    <PersonalDetails PatientMedicalFileInfo={patientMedicalFile} />

                    {/* <ExaminationsResults examinations={patientMedicalFile.examination}/> */}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    patientMedicalFile: patientMedicalFileSelector.patientMedicalFileInfo(state),
    showLoader: state.loading.effects.patientMedicalFile.fetchPatientMedicalFile
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatientMedicalFile: (patientId: string) => dispatch.patientMedicalFile.fetchPatientMedicalFile(patientId)
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientMedicalFileDetails);
