import React, { ReactElement, useState } from 'react';
import Popup from 'reactjs-popup';
import { IconButton, Button, TextField, Avatar } from '@material-ui/core';
import { ExamPointTypes, pointTypeToImage } from '../../../models/entities/examPointTypes';
import './Exam.css';
import { Data } from './CreateExamination';

interface SelectPointTypeProps {
    addData: (point: Data) => void;
}

export const SelectPointType = ({ addData }: SelectPointTypeProps) => {
    let popups: ReactElement[] = [];
    Object.keys(ExamPointTypes).map((key) => {
        // @ts-ignore
        const value = ExamPointTypes[key];
        if (!isNaN(value)) {
            popups.push(
                <Popup
                    trigger={
                        <IconButton>
                            <Avatar variant="square" src={pointTypeToImage(value)}></Avatar>
                        </IconButton>
                    }
                    position={'bottom center'}
                >
                    <NewPointForm type={value} addData={addData} />
                </Popup>
            );
        }
    });

    return <div>{popups}</div>;
};

interface NewPointForm {
    type: ExamPointTypes;
    addData: (point: Data) => void;
}

const NewPointForm = ({ type, addData }: NewPointForm) => {
    const [state, setState] = useState({ type: type, x: -1, y: -1 });

    const submitForm = () => {
        try {
            validateInputs();
            addData(state); // add real data!
            console.log(`Added ${JSON.stringify(state)} to the graph (before normalized)`);
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
        <form style={{ direction: 'ltr' }}>
            <div className={'formInput'}>
                <label>X: </label>
                <TextField placeholder={'250'} onChange={(event) => setState({ ...state, x: Number(event.target.value) })}>
                    ofek
                </TextField>
            </div>
            <div className={'formInput'}>
                <label>Y: </label>
                <TextField placeholder={'1'} onChange={(event) => setState({ ...state, y: Number(event.target.value) })}>
                    rac
                </TextField>
            </div>
            <Button onClick={submitForm}>Create</Button>
        </form>
    );
};
