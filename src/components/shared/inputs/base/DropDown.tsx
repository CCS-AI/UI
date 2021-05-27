import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

export type Option = {
    value: string | number;
    text: string;
};

export const enumToDropdownOptions = (object: any): Array<Option> => {
    return Object.keys(object).map((key) => {
        return { value: key, text: object[key] as string };
    });
};

export type BaseProps = {
    onChange?: any;
    onBlur?: any;
    placeHolder?: string;
    options: Array<Option>;
    value?: string | string[];
    disabled?: boolean;
    hasError?: boolean;
    error?: string;
    preventPopoverBug?: boolean;
    multiple?: boolean;
    variant?: 'filled' | 'outlined' | 'standard';
    fullWidth?: boolean;
};

const DropDown = ({ value, options, placeHolder, disabled, onChange, onBlur, hasError, error, multiple, variant, fullWidth }: BaseProps) => {
    return (
        <FormControl error={hasError} variant={variant} fullWidth={fullWidth}>
            <InputLabel>{placeHolder}</InputLabel>
            <Select multiple={multiple} disabled={disabled} label={placeHolder} value={value} onChange={onChange} onBlur={onBlur}>
                {options.map((option, index) => {
                    return (
                        <MenuItem key={index} value={option.value}>
                            {option.text}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
};
DropDown.defaultProps = {
    width: '100%',
    height: 'auto',
    style: '',
    variant: 'outlined',
    fullWidth: true
};
export default DropDown;
