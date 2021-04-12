import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, match } from 'react-router-dom';
import Loader from '../../../shared/SmallComponents/Loader';
import { FormDropDown, FormTextInput } from '../../../shared/inputs/form';
import { styled } from '../../../shared/Theme/theme';
import { Button, CssBaseline, Paper, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { registerExaminerSchema } from '../../../../validationSchemas/registerExaminerForm';
import { Examiner } from '../../../../models/entities/examiner';
import { GridRenderingZone } from '@material-ui/data-grid';
import DropDown from '../../../shared/inputs/base/DropDown';

type RegisterExaminerProps = {
    showLoader: boolean;
    error: string;
    registerExaminer: (examiner: Examiner) => void;
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

const RegisterExaminerForm = ({ showLoader, error, registerExaminer, match }: RegisterExaminerProps) => {
    const initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: new Date(),
        licenseNumber: ''
    };

    const submitNewExaminer = (examiner: Examiner) => {
        registerExaminer(examiner);
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
                validationSchema={registerExaminerSchema()}
                onSubmit={(values) => {
                    submitNewExaminer({
                        email: values.email.trim(),
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        phoneNumber: values.phoneNumber,
                        birthDate: values.birthDate,
                        licenseNumber: values.licenseNumber
                    } as Examiner);
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
                                        הוספת מטפל חדש למערכת
                                    </Typography>
                                    <Form className={classes.form} noValidate>
                                        <FormTextInput required label="שם פרטי" name="firstName" autoFocus />
                                        <FormTextInput required label="שם משפחה" name="lastName" autoFocus />
                                        <FormTextInput required label="איימיל" name="email" autoFocus />
                                        <FormTextInput required label="סיסמא" name="password" autoFocus />
                                        <FormTextInput required label="מספר טלפון" name="phoneNumber" autoFocus />
                                        <FormTextInput required label="תאריך לידה" name="birth" type="Date" fullWidth={false} />
                                        <FormTextInput required label="מספר רישיון" name="licenseNumber" autoFocus />
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
export default RegisterExaminerForm;
