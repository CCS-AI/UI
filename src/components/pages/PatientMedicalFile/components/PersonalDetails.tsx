import { Card } from '@material-ui/core';
import React from 'react';
import { PatientMedicalFile } from '../../../../models/entities/pmf';

type Props = {
    PatientMedicalFileInfo?: PatientMedicalFile;
};

const PersonalDetails = ({ PatientMedicalFileInfo }: Props) => {
    console.log(PatientMedicalFileInfo);
    return (
        <Card>
            <h3>פרטים אישיים:</h3>
            <div>
                <div>שם מלא</div>
                {/* <div>{PatientMedicalFileInfo. + ' ' + patient.lastName}</div> */}
            </div>
        </Card>
    );
};

export default PersonalDetails;
