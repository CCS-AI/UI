import * as Yup from 'yup';

export const registerExaminerSchema = () => {
    return Yup.object().shape({
        email: Yup.string().trim().email('פורמט אימייל לא תקין').required('שדה חובה'),
        password: Yup.string().required('שדה חובה'),
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
        phoneNumber: Yup.string().required('שדה חובה'),
        birthDate: Yup.date().required('שדה חובה'),
        role: Yup.string().required('שדה חובה'),
        licenseNumber: Yup.string().required('שדה חובה')
    });
};
