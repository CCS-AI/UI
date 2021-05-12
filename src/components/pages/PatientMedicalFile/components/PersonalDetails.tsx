import { Card } from '@material-ui/core';
import React from 'react';
import { Gender, HMO, Patient } from '../../../../models/entities/patient';

type Props = {
    patient: Patient;
};

const PersonalDetails = ({ patient }: Props) => {
    return (
        <>
            {patient ? (
                <Card>
                    <h3>פרטים אישיים</h3>
                    <div>
                        <h5>שם מלא: {' ' + patient.firstName + ' ' + patient.lastName}</h5>
                    </div>
                    <div>
                        <h5>תעודת זהות: {patient.personalId ? ' ' + patient.personalId : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>תאריך לידה: {patient.birth ? ' ' + patient.birth : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>מין: {Gender[patient.gender] ? ' ' + Gender[patient.gender] : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>כתובת: {patient.address ? ' ' + patient.address : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>מספר טלפון 1: {patient.phone1 ? ' ' + patient.phone1 : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>מספר טלפון 2: {patient.phone2 ? ' ' + patient.phone2 : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>מייל: {patient.email ? ' ' + patient.email : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <div>
                        <h5>קופת חולים: {HMO[patient.hmo] ? ' ' + HMO[patient.hmo] : ' *נתון לא קיים במערכת*'}</h5>
                    </div>
                    <h3>בדיקות</h3>
                </Card>
            ) : (
                <h3>אין נתונים</h3>
            )}
        </>
    );
};

export default PersonalDetails;
