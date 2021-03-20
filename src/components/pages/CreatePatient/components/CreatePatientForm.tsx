import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, match } from 'react-router-dom';
import Loader from '../../../shared/SmallComponents/Loader';
import { FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button, CssBaseline, Paper, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createPatientSchema } from '../../../../validationSchemas/createPatientForm';
import { Patient } from '../../../../models/entities/patient';
import { GridRenderingZone } from '@material-ui/data-grid';
import { patient } from '../../../../state/ducks/patient/patient';

type CreatePatientProps = {
    showLoader: boolean;
    error: string;
    createPatient: (patient: Patient) => void;
    match: match;
};
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        // backgroundImage: `url(${loginBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const CreatePatientForm = ({ showLoader, error, createPatient, match }: CreatePatientProps) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        id: '',
        email: '',
        gender: '',
        birth: new Date(),
        phoneNumber1: '',
        phoneNumber2: '',
        HMO: '',
        cityName: '',
        streetName: '',
        houseNumber: '',
        apartmentNumber: ''
    };

    const submitNewPatient = (patient: Patient) => {
        createPatient(patient);
    };
    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                Communication clinical system {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    };
    const classes = useStyles();
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={createPatientSchema()}
                onSubmit={(values) => {
                    submitNewPatient({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        id: values.id,
                        email: values.email.trim(),
                        //  gender: values.gender,
                        gender: 2,
                        birth: values.birth,
                        phone1: values.phoneNumber1,
                        phone2: values.phoneNumber2,
                        // hmo: values.HMO,
                        hmo: 2,
                        // cityName: values.cityName,
                        // streetName: values.streetName,
                        // houseNumber: values.houseNumber,
                        // apartmentNumber: values.apartmentNumber
                        address: values.cityName,
                        organizationId: values.streetName,
                        personalId: values.houseNumber
                    });
                }}
            >
                {(formik) => {
                    const { errors, touched, isValid } = formik;
                    return (
                        <Grid container component="main" className={classes.root}>
                            <CssBaseline />
                            <Grid item xs={false} sm={4} md={4} className={classes.image} />
                            <Grid item xs={12} sm={4} md={4} component={Paper} elevation={6} square>
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h4">
                                        הוספת מטופל חדש למערכת
                                    </Typography>
                                    <Form className={classes.form} noValidate>
                                        <FormTextInput required label="שם פרטי" name="firstName" autoFocus />
                                        <FormTextInput required label="שם משפחה" name="lastName" autoFocus />
                                        <FormTextInput required label="תעודת זהות" name="id" autoFocus />
                                        <FormTextInput required label="אימייל" name="email" autoFocus />
                                        <FormTextInput required label="מין" name="gender" autoFocus />
                                        <FormTextInput required label="תאריך לידה" name="birth" type="Date" fullWidth={false} />
                                        <FormTextInput required label="מספר טלפון" name="phoneNumber1" autoFocus />
                                        <FormTextInput required label="מספר טלפון נוסף" name="phoneNumber2" autoFocus />
                                        <FormTextInput required label="קופת חולים" name="HMO" autoFocus />
                                        <Typography component="h1" variant="h5">
                                            כתובת
                                        </Typography>
                                        <FormTextInput required label="עיר" name="cityName" autoFocus />
                                        <FormTextInput required label="רחוב" name="streetName" autoFocus />
                                        <FormTextInput required label="מספר בית" name="houseNumber" autoFocus />
                                        {/* <FormTextInput required label="מספר דירה" name="apartmentNumber" autoFocus /> */}
                                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                            {showLoader || false ? <Loader width="20px" marginTop="0px" showText={false} /> : <span>{'הוספה'}</span>}
                                        </Button>
                                        <ErrorMsg>{error}</ErrorMsg>
                                        <Box mt={5}>
                                            <Copyright />
                                        </Box>
                                    </Form>
                                </div>
                            </Grid>
                        </Grid>
                    );
                }}
            </Formik>
        </>
    );
};

const ErrorMsg = styled.div`
    color: red;
    text-align: center;
`;
export default CreatePatientForm;
