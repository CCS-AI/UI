import { Dialog } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../state/store/store';
import { PatientMedicalFile } from '../../../models/entities/pmf';
import Loader from '../../shared/SmallComponents/Loader';
import PersonalDetails from './components/PersonalDetails';
import { patientMedicalFileSelector } from '../../../state/ducks/patientMedicalfile/selectors';
import { ExaminationsResults } from './components/ExaminationsResults';
import StaticDateTimePicker from '../../shared/StaticDateTimePicker/StaticDateTimePicker';
import SideEffectJS from 'side-effect-js';

type Props = {
    patientId: string;
    patientMedicalFileInfo?: PatientMedicalFile; //TODO: change to this - PatientMedicalFile;
    showLoader: boolean;
    fetchPatientMedicalFile: (patientId: string) => void;
    setSingleProduct: () => void;
};

const PatientMedicalFileDetails = ({ patientId, patientMedicalFileInfo, fetchPatientMedicalFile, setSingleProduct }: Props) => {
    useEffect(() => {
        setSingleProduct();
        fetchPatientMedicalFile(patientId);
    }, []);
    return (
        <>
            {patientMedicalFileInfo ? (
                <div>
                    <h1>תיק רפואי</h1>
                    <PersonalDetails patient={patientMedicalFileInfo.patient} />
                    <h3>בדיקות</h3>
                    {!patientMedicalFileInfo.examinations || !patientMedicalFileInfo.examinations.length ? (
                        <div> </div>
                    ) : (
                        <div>
                            <ExaminationsResults
                                examinationsRows={patientMedicalFileInfo.examinations}
                                columns={Object.keys(patientMedicalFileInfo.examinations[0])}
                                pageSize={patientMedicalFileInfo.examinations.length}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <div>
                        <h1>תיק רפואי לא קיים</h1>
                    </div>
                    <Loader />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    patientMedicalFileInfo: patientMedicalFileSelector.patientMedicalFileInfo(state),
    showLoader: state.loading.effects.patientMedicalFile.fetchPatientMedicalFile
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchPatientMedicalFile: (patientId: string) => dispatch.patientMedicalFile.fetchPatientMedicalFile(patientId),
    setSingleProduct: () => dispatch.patientMedicalFile.setSingleProduct()
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientMedicalFileDetails);

/*
https://material-ui.com/components/dialogs/
*/

/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <PatientMedicalFile patientId={patientId} />
</Dialog> */
