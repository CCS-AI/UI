import * as Yup from 'yup';

export const createPatientSchema = () => {
    return Yup.object().shape({
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
        id: Yup.string().required('שדה חובה'),
        email: Yup.string().trim().email('פורמט אימייל לא תקין').required('שדה חובה'),
        //gender: Yup.string().required('שדה חובה'),
        // birthDate: Yup.date().required('שדה חובה'),
        phoneNumber1: Yup.string().required('שדה חובה'),
        phoneNumber2: Yup.string().required('שדה חובה'),
        //   HMO: Yup.string().required('שדה חובה'),
        cityName: Yup.string().required('שדה חובה'),
        streetName: Yup.string().required('שדה חובה'),
        houseNumber: Yup.string().required('שדה חובה'),
        apartmentNumber: Yup.string()
    });
};
