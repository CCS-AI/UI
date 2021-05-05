import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Patient } from '../../../models/entities/patient';
import { RootState } from '../../../state/store/store';
import Loader from '../../shared/SmallComponents/Loader';
import PersonalDetails from './components/PersonalDetails';

type Props = {
    patientId: string;
    patientMedicalFile?: any; //TODO: change to this - PatientMedicalFile;
    fetchPatientMedicalFile: (patientId: string) => void;
};
/*
https://material-ui.com/components/dialogs/

<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <PatientMedicalFile patientId={patientId} />
</Dialog>
*/
const PatientMedicalFile = ({ patientId, patientMedicalFile, fetchPatientMedicalFile }: Props) => {
    useEffect(() => {
        //TODO: fetchPatientMedicalFile(patientId)
    }, [patientId, patientMedicalFile]);
    const patient = {
        firstName: 'לי',
        lastName: 'כוכב'
    } as Patient;
    return (
        <>
            {!patientMedicalFile ? (
                <div>
                    <h1>תיק רפואי</h1>
                    <PersonalDetails patient={patient} />
                    {/* <ExaminationsResults examinations={patientMedicalFile.examination}/> */}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    //patient:
});

const mapDispatchToProps = (dispatch: any) => ({
    //fetchPatientMedicalFile:
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientMedicalFile);
