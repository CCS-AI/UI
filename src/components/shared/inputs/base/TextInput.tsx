import React from 'react';
import { CSSProperties } from 'styled-components';
import { FieldInputProps } from 'formik';
import { TextField } from '@material-ui/core';

export type BaseProps = {
    placeHolder?: string;
    value?: string;
    onChange?: any;
    style?: CSSProperties;
    name?: string;
    field?: FieldInputProps<any>;
    hasError?: boolean;
    error?: string;
    type?: string;
    allowClear?: boolean;
    multiline?: boolean;
};

const TextInput = ({ onChange, hasError, error, value, name, placeHolder, style, field, type, multiline }: BaseProps) => {
    return (
        <TextField
            type={type}
            autoComplete="off"
            name={name}
            {...field}
            onChange={(e) => {
                onChange && onChange(e.currentTarget.value);
                if (field?.onChange) field.onChange(e);
            }}
            value={value ?? field?.value}
            style={style}
            placeholder={placeHolder}
            error={hasError}
            helperText={error}
            multiline={multiline}
        />
    );
};
TextInput.defaultProps = {
    type: 'text'
};
export default TextInput;
