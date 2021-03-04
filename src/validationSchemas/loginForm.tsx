import * as Yup from 'yup';

export const loginSchema = () => {
    return Yup.object().shape({
        email: Yup.string().trim().email('פורמט אימייל לא תקין').required('שדה חובה'),
        password: Yup.string().required('שדה חובה')
    });
};
