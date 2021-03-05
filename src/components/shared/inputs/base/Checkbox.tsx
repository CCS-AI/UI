import { CheckboxProps, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { Checkbox as CheckBox } from '@material-ui/core';

export type BaseProps = CheckboxProps & {
    text: string | undefined;
    onChange?: (event: any) => void;
};

const Checkbox = ({ checked, name, onChange, text }: BaseProps) => {
    return <FormControlLabel control={<CheckBox onChange={onChange} checked={checked} name={name} />} label={text} />;
};
Checkbox.defaultProps = {};
export default Checkbox;
