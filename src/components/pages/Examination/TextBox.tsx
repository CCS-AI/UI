import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

export interface TextBoxProps {
    initVal: string;
    width: number;
    rows: number;
    valueChange: (text: string) => void;
}

export const TextBox = (props: TextBoxProps) => {
    return (
        <div style={{ width: props.width }}>
            <TextField
                fullWidth
                multiline
                rows={props.rows}
                variant="outlined"
                color="secondary"
                onChange={(event) => props.valueChange(event.target.value)}
            />
            ;
        </div>
    );
};
