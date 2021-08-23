import React, { useEffect, useState } from 'react';
import { examPointTypes, ExamPointTypes } from '../../../models/entities/examPointTypes';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../state/store/store';
import { userSelectors } from '../../../state/ducks/examiner/selectors';
import { TableCard } from '../../shared/form/StyledFormShared';
import Loader from '../../shared/SmallComponents/Loader';
import { FlexPageContainer } from '../../shared/styled/styled';
import { Gender, GenderHE, HMO, HMO_HE } from '../../../models/entities/patient';
import { xAxisPoints } from './CreateExamination';
import { Button } from '@material-ui/core';
import { ExaminationFilterResult, PatientFilterDetails } from '../../../models/entities/filter';

// export type PatientFilterDetails = {
//     gender: Gender;
//     yearOfBirth: number;
//     hmo: HMO;
// };
//
// export type ExaminationFilterResult = {
//     examinationDate: string;
//     ageOnCreate: number;
//     examiner: string;
//     frequency1: number;
//     frequency2: number;
//     type: ExamPointTypes;
//     operation: '<' | '>' | '=' | '';
//     operationNumber: number;
//     earSide: 'RIGHT' | 'LEFT' | '';
// };

export type FilterExaminationProps = RouteComponentProps & {
    //should changed to Examiner[]
    examiners: any | undefined;
    fetchExaminers: () => Promise<string[]>;
    showLoader: boolean;
    setPatientFilterDetails?: React.Dispatch<React.SetStateAction<PatientFilterDetails | undefined>>;
    setExaminationFilterResult?: React.Dispatch<React.SetStateAction<ExaminationFilterResult | undefined>>;
};

const FilterExamination = ({
    examiners,
    fetchExaminers,
    showLoader,
    setPatientFilterDetails,
    setExaminationFilterResult
}: FilterExaminationProps) => {
    const [state, setState] = useState(() => {
        return {
            patientDetails: {
                gender: '',
                birthYear: '',
                dateOfExamination: '',
                ageOnCreate: '',
                examinerName: '',
                hmo: ''
            },
            examination: {
                frequency1: '',
                frequency2: '',
                earSide: '',
                type: '',
                operation: '',
                operationNumber: ''
            }
        };
    });

    const findExaminerIdByName = (examinerName: string) => {
        if (!examiners) return undefined;
        for (var i = 0; i < examiners.length; i++) {
            if (examiners[i].firstName + ' ' + examiners[i].lastName == examinerName) return examiners[i].id;
        }
        return undefined;
    };

    useEffect(() => {
        fetchExaminers();
    }, [fetchExaminers]);

    useEffect(() => {
        const allExamFiltersValid = Object.keys(state.examination).every((key) => !isError(key));
        if (!allExamFiltersValid) {
            if (setPatientFilterDetails && setExaminationFilterResult) {
                setPatientFilterDetails(undefined);
                setExaminationFilterResult(undefined);
            }
            return;
        }

        let patientDetails: PatientFilterDetails = {} as PatientFilterDetails;
        if (state.patientDetails.gender != '' && state.patientDetails.gender != undefined)
            patientDetails['gender'] = state.patientDetails.gender == 'זכר' ? Gender.MALE : Gender.FEMALE;
        else patientDetails['gender'] = undefined;

        if (state.patientDetails.birthYear != '' && state.patientDetails.birthYear != undefined)
            patientDetails['yearOfBirth'] = Number(state.patientDetails.birthYear);
        else patientDetails['yearOfBirth'] = undefined;

        if (state.patientDetails.hmo != '' && state.patientDetails.hmo != undefined) {
            if (state.patientDetails.hmo == 'כללית') patientDetails['hmo'] = 1;
            else if (state.patientDetails.hmo == 'מכבי') patientDetails['hmo'] = 2;
            else patientDetails['hmo'] = 3;
        } else patientDetails['hmo'] = undefined;

        let examDetails: ExaminationFilterResult = {} as ExaminationFilterResult;

        if (state.patientDetails.ageOnCreate != '' && state.patientDetails.ageOnCreate != undefined)
            examDetails['ageOnCreate'] = Number(state.patientDetails.ageOnCreate);
        else examDetails['ageOnCreate'] = undefined;

        if (state.patientDetails.dateOfExamination != '' && state.patientDetails.dateOfExamination != undefined)
            examDetails['examinationDate'] = new Date(state.patientDetails.dateOfExamination);
        else examDetails['examinationDate'] = undefined;
        if (state.patientDetails.examinerName != '' && state.patientDetails.examinerName != undefined)
            examDetails['examiner'] = findExaminerIdByName(state.patientDetails.examinerName);
        else examDetails['examiner'] = undefined;

        if (state.examination.frequency1 != '' && state.examination.frequency1 != undefined)
            examDetails['frequency1'] = Number(state.examination.frequency1);
        else examDetails['frequency1'] = undefined;

        if (state.examination.frequency2 != '' && state.examination.frequency2 != undefined)
            examDetails['frequency2'] = Number(state.examination.frequency2);
        else examDetails['frequency2'] = undefined;
        if (state.examination.earSide != '' && state.examination.earSide != undefined)
            examDetails['earSide'] = state.examination.earSide as 'RIGHT' | 'LEFT' | undefined;
        else examDetails['earSide'] = undefined;
        if (state.examination.operationNumber != '' && state.examination.operationNumber != undefined)
            examDetails['operationNumber'] = Number(state.examination.operationNumber);
        else examDetails['operationNumber'] = undefined;
        if (state.examination.operation != '' && state.examination.operation != undefined)
            examDetails['operation'] = state.examination.operation as '>' | '<' | '=';
        else examDetails['operation'] = undefined;
        if (state.examination.type != '' && state.examination.type != undefined) examDetails['type'] = state.examination.type as ExamPointTypes;
        else examDetails['type'] = undefined;

        if (setPatientFilterDetails && setExaminationFilterResult) {
            setPatientFilterDetails(patientDetails);
            setExaminationFilterResult(examDetails);
        }
    }, [state.examination, state.patientDetails, state]);

    const handleGenderChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            patientDetails: {
                ...state.patientDetails,
                gender: event.target.value as string
            }
        });

    const range = (start: number, end: number) => {
        let arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
    };

    const handleBirthYearChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            patientDetails: {
                ...state.patientDetails,
                birthYear: event.target.value as string
            }
        });

    const handleDateOfExamChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            patientDetails: {
                ...state.patientDetails,
                dateOfExamination: event.target.value as string
            }
        });

    const handleExaminerChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            patientDetails: {
                ...state.patientDetails,
                examinerName: event.target.value as string
            }
        });

    const handleHmoChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            patientDetails: {
                ...state.patientDetails,
                hmo: event.target.value as string
            }
        });
    const handleOpsChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            examination: {
                ...state.examination,
                operation: event.target.value as string
            }
        });

    const handlePointTypeChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            examination: {
                ...state.examination,
                type: event.target.value as string
            }
        });

    const handleFrequencyOneChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            examination: {
                ...state.examination,
                frequency1: event.target.value as string
            }
        });

    const handleFrequencyTwoChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            examination: {
                ...state.examination,
                frequency2: event.target.value as string
            }
        });

    const handleEarChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            examination: {
                ...state.examination,
                earSide: event.target.value as string
            }
        });

    const getItemsToSelectFromIterable = (iterable: any[]) => {
        let menuItems: any[] = [];
        iterable.forEach((item) => menuItems.push(<MenuItem value={item.toString()}>{item.toString()}</MenuItem>));
        return menuItems;
    };

    const isError = (key: string) => {
        const isAllOtherNull = Object.keys(state.examination).every((k) => {
            // @ts-ignore
            return state.examination[k] == '' || key == k;
        });
        // @ts-ignore
        return isAllOtherNull ? false : state.examination[key] == '';
    };

    const validateAndSendQuery = () => {
        const allValid = Object.keys(state.examination).every((key) => !isError(key));
        if (!allValid) return alert('טופס לא תקין!');
    };

    const handleValueChanged = (event: React.ChangeEvent<{ value: unknown }>) =>
        setState({
            ...state,
            examination: {
                ...state.examination,
                operationNumber: event.target.value as string
            }
        });

    return (
        <FlexPageContainer>
            <TableCard>
                {showLoader ? (
                    <Loader />
                ) : !examiners || !examiners.length ? (
                    <div>No examiners</div>
                ) : (
                    <div>
                        <div>
                            <h3>פרטי מטופל</h3>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <FormControl style={{ marginRight: 50, width: 100 }}>
                                        <InputLabel>מין</InputLabel>
                                        <Select value={state.patientDetails.gender} onChange={handleGenderChanged}>
                                            {getItemsToSelectFromIterable(Object.values(GenderHE))}
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl style={{ marginRight: 50, width: 100 }}>
                                        <InputLabel>שנת לידה</InputLabel>
                                        <Select value={state.patientDetails.birthYear} onChange={handleBirthYearChanged}>
                                            {getItemsToSelectFromIterable(range(1940, 2021))}
                                            <em>None</em>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl style={{ marginRight: 50, width: 150 }}>
                                        <TextField
                                            label="תאריך הבדיקה"
                                            type="date"
                                            defaultValue={state.patientDetails.dateOfExamination}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            onChange={handleDateOfExamChanged}
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl style={{ marginRight: 50, width: 100 }}>
                                        <InputLabel>מאבחן</InputLabel>
                                        <Select value={state.patientDetails.examinerName} onChange={handleExaminerChanged}>
                                            {getItemsToSelectFromIterable(
                                                examiners.map(
                                                    (examiner: { [x: string]: string }) => examiner['firstName'] + ' ' + examiner['lastName']
                                                )
                                            )}
                                            <em>None</em>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl style={{ marginRight: 50, width: 100 }}>
                                        <InputLabel>קופת חולים</InputLabel>
                                        <Select value={state.patientDetails.hmo} onChange={handleHmoChanged}>
                                            {getItemsToSelectFromIterable(Object.values(HMO_HE))}
                                            <em>None</em>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 70 }}>
                            <h3>פרטי בדיקה</h3>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <FormControl style={{ marginRight: 50, width: 80 }}>
                                        <InputLabel>תדירות א</InputLabel>
                                        <Select
                                            value={state.examination.frequency1}
                                            onChange={handleFrequencyOneChanged}
                                            error={isError('frequency1')}
                                        >
                                            {getItemsToSelectFromIterable(xAxisPoints)}
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ marginRight: 50, width: 80 }}>
                                        <InputLabel>תדירות ב</InputLabel>
                                        <Select
                                            value={state.examination.frequency2}
                                            onChange={handleFrequencyTwoChanged}
                                            error={isError('frequency2')}
                                        >
                                            {getItemsToSelectFromIterable(xAxisPoints)}
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ marginRight: 50, width: 80 }}>
                                        <InputLabel>אוזן</InputLabel>
                                        <Select value={state.examination.earSide} onChange={handleEarChanged} error={isError('earSide')}>
                                            {getItemsToSelectFromIterable(['ימין', 'שמאל'])}
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ marginRight: 50, width: 180 }}>
                                        <InputLabel>סוג</InputLabel>
                                        <Select value={state.examination.type} onChange={handlePointTypeChanged} error={isError('type')}>
                                            {getItemsToSelectFromIterable(examPointTypes)}
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ marginRight: 50, width: 80 }}>
                                        <InputLabel>פעולה</InputLabel>
                                        <Select value={state.examination.operation} onChange={handleOpsChanged} error={isError('operation')}>
                                            {getItemsToSelectFromIterable(['<', '>', '='])}
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ marginRight: 50, width: 80 }}>
                                        <TextField
                                            label="ערך"
                                            type="number"
                                            value={state.examination.operationNumber}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            onChange={handleValueChanged}
                                            error={isError('operationNumber')}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 40
                            }}
                        ></div>
                    </div>
                )}
            </TableCard>
        </FlexPageContainer>
    );
};

const mapStateToProps = (state: RootState) => ({
    examiners: userSelectors.examinersName(state),
    showLoader: state.loading.effects.patient.fetchAllPatients
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchExaminers: () => dispatch.examiner.fetchAllExaminers()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterExamination));
