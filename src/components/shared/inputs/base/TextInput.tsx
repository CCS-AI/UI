import React from 'react';
import { FieldInputProps } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

export type BaseProps = TextFieldProps & {
    placeHolder?: string;
    onChange?: any;
    field?: FieldInputProps<any>;
};

const TextInput = ({ onChange, value, name, field, ...restProps }: BaseProps) => {
    return (
        <TextField
            autoComplete="off"
            name={name}
            {...field}
            onChange={(e) => {
                onChange && onChange(e.currentTarget.value);
                if (field?.onChange) field.onChange(e);
            }}
            value={value ?? field?.value}
            {...restProps}
        />
    );
};
TextInput.defaultProps = {
    type: 'text',
    variant: 'outlined',
    margin: 'normal',
    fullWidth: true
};
export default TextInput;
