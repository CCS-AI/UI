import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, match } from 'react-router-dom';
import Loader from '../../../shared/SmallComponents/Loader';
import { FormDropDown, FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button, CssBaseline, Paper, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createPatientSchema } from '../../../../validationSchemas/createPatientForm';
import { Patient } from '../../../../models/entities/patient';
import { GridRenderingZone } from '@material-ui/data-grid';
import { patient } from '../../../../state/ducks/patient/patient';
import DropDown from '../../../shared/inputs/base/DropDown';

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
        gender: 0,
        birth: new Date(),
        address: '',
        phone1: '',
        phone2: '',
        email: '',
        hmo: 0,
        personalId: ''
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
                        gender: values.gender,
                        birth: values.birth,
                        address: values.address,
                        phone1: values.phone2,
                        phone2: values.phone1,
                        email: values.email.trim(),
                        hmo: values.hmo,
                        personalId: values.personalId
                    } as Patient);
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
                                        <FormTextInput required label="תעודת זהות" name="personalId" autoFocus />
                                        <FormTextInput required label="אימייל" name="email" autoFocus />
                                        <Typography component="h1" variant="h6">
                                            מין:
                                        </Typography>
                                        <FormDropDown
                                            name="gender"
                                            options={[
                                                { value: 1, text: 'זכר' },
                                                { value: 2, text: 'נקבה' }
                                            ]}
                                        />
                                        <FormTextInput required label="תאריך לידה" name="birth" type="Date" fullWidth={false} />
                                        <FormTextInput required label="מספר טלפון" name="phone1" autoFocus />
                                        <FormTextInput required label="מספר טלפון נוסף" name="phone2" autoFocus />
                                        <Typography component="h1" variant="h6">
                                            קופת חולים:
                                        </Typography>
                                        <FormDropDown
                                            name="hmo"
                                            options={[
                                                { value: 1, text: 'כללית' },
                                                { value: 2, text: 'מכבי' },
                                                { value: 3, text: 'לאומית' }
                                            ]}
                                        />
                                        <FormTextInput required label="כתובת" name="address" autoFocus />
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
