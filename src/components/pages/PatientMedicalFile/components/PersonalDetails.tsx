import { Card } from '@material-ui/core';
import React from 'react';
import { Patient } from '../../../../models/entities/patient';

type Props = {
    patient: Patient;
};

const PersonalDetails = ({ patient }: Props) => {
    return (
        <Card>
            <h3>פרטים אישיים:</h3>
            <div>
                <div>שם מלא</div>
                <div>{patient.firstName + ' ' + patient.lastName}</div>
            </div>
        </Card>
    );
};

export default PersonalDetails;
