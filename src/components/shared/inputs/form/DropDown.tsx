import React from 'react';
import DropDown, { BaseProps } from '../base/DropDown';
import { Field, FieldProps } from 'formik';

type Props = BaseProps & {
    name: string;
};

const FormDropDown = ({ name, onChange, onBlur, ...restProps }: Props) => {
    return (
        <Field name={name}>
            {({ field: { value }, meta, form: { setFieldValue, setFieldTouched } }: FieldProps) => {
                const { touched, error } = meta;
                const hasError = touched && error !== undefined;
                return (
                    <DropDown
                        hasError={hasError}
                        onChange={({ target }: React.ChangeEvent<{ value: unknown }>, child: React.ReactNode) => {
                            setFieldValue(name, target.value);
                            onChange && onChange(target.value);
                        }}
                        onBlur={(value: any) => {
                            setFieldTouched(name);
                            onBlur && onBlur(value);
                        }}
                        value={!value ? '' : value}
                        {...restProps}
                    />
                );
            }}
        </Field>
    );
};

export default FormDropDown;
