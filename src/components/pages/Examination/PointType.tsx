import React, { ReactElement, useState } from 'react';
import Popup from 'reactjs-popup';
import { IconButton, Button, TextField, Avatar } from '@material-ui/core';
import {
    ExamPointTypes,
    examPointTypes,
    pointToImage,
    earTypes,
    noResTypes,
    NO_RES_SUFFIX,
    typeWithNoRes
} from '../../../models/entities/examPointTypes';
import './Exam.css';
import Checkbox from '@material-ui/core/Checkbox';
import { Data } from './CreateExamination';

interface SelectPointTypeProps {
    addData: (point: Data) => void;
}

export const SelectPointType = ({ addData }: SelectPointTypeProps) => {
    let popups: ReactElement[] = [];

    earTypes.forEach((ear) => {
        examPointTypes
            .filter((examType) => !examType.includes(NO_RES_SUFFIX))
            .map((key) => {
                const type = key as ExamPointTypes;
                const earSide = ear as 'RIGHT' | 'LEFT';
                popups.push(
                    <Popup
                        trigger={
                            <IconButton>
                                <Avatar variant="square" src={pointToImage(type, earSide)}></Avatar>
                            </IconButton>
                        }
                        position={'bottom center'}
                    >
                        <NewPointForm data={{ x: -1, y: -1, type: type, ear: earSide, isNoResponse: false }} addData={addData} />
                    </Popup>
                );
            });
    });

    return <div>{popups}</div>;
};

interface NewPointForm {
    data: Data;
    addData: (point: Data) => void;
}

const NewPointForm = ({ data, addData }: NewPointForm) => {
    const [state, setState] = useState({ ...data });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, isNoResponse: event.target.checked });
    };

    const submitForm = () => {
        try {
            validateInputs();
            let newData = { ...state };
            if (state.isNoResponse) newData.type = typeWithNoRes(state.type);
            addData(newData); // add real data!
            console.log(`Added ${JSON.stringify(newData)} to the graph (before normalized)`);
        } catch (e) {
            alert(e);
        }
    };

    const validateInputs = () => {
        if (state.x < 250) throw new Error('Lower bound of X is 250');
        if (state.x > 8000) throw new Error('Upper bound of X is 8000');
        if (state.y > 120) throw new Error('Upper bound of Y is 120');
        if (state.y < 0) throw new Error('Lower bound of Y is 120');
    };

    return (
        <div>
            <label>Selected type: </label>
            <IconButton>
                <Avatar variant="square" src={pointToImage(state.type, state.ear)} style={{ width: 20, height: 20 }}></Avatar>
            </IconButton>
            <form style={{ direction: 'ltr' }}>
                <div className={'formInput'}>
                    <label>X: </label>
                    <TextField placeholder={'250-8000'} onChange={(event) => setState({ ...state, x: Number(event.target.value) })}>
                        ofek
                    </TextField>
                </div>
                <div className={'formInput'}>
                    <label>Y: </label>
                    <TextField placeholder={'0-120'} onChange={(event) => setState({ ...state, y: Number(event.target.value) })}>
                        rac
                    </TextField>
                </div>
                <div hidden={!noResTypes.includes(state.type)}>
                    <label>No response: </label>
                    <Checkbox checked={state.isNoResponse} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
                </div>
                <Button onClick={submitForm}>Create</Button>
            </form>
        </div>
    );
};
