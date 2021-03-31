import * as Yup from 'yup';

export const createPatientSchema = () => {
    return Yup.object().shape({
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
        personalId: Yup.string().required('שדה חובה'),
        email: Yup.string().trim().email('פורמט אימייל לא תקין').required('שדה חובה'),
        gender: Yup.number().required('שדה חובה'),
        birth: Yup.date().required('שדה חובה'),
        phone1: Yup.string().required('שדה חובה'),
        phone2: Yup.string().required('שדה חובה'),
        hmo: Yup.number().required('שדה חובה'),
        address: Yup.string().required('שדה חובה'),
        organizationId: Yup.string().required('שדה חובה')
    });
};
