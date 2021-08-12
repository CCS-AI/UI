import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

export interface TextAreaProps {
    deafultVal: string;
    width: number | string;
    rows: number;
}

export const TextArea = (props: TextAreaProps) => {
    return (
        <div style={{ width: props.width }}>
            <TextField
                fullWidth
                multiline
                rows={props.rows}
                variant="outlined"
                color="secondary"
                defaultValue={props.deafultVal}
                inputProps={{ readOnly: true }}
            />
        </div>
    );
};
