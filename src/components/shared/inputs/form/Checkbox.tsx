import React from 'react';
import { Field, FieldProps } from 'formik';
import Checkbox, { BaseProps } from '../base/Checkbox';

type Props = BaseProps & {
    name: string;
};

const FormCheckbox = ({ name, onChange, ...restProps }: Props) => {
    return (
        <Field name={name}>
            {({ field: { value }, meta, form: { setFieldValue, setFieldTouched } }: FieldProps) => {
                return (
                    <div>
                        <Checkbox
                            onChange={(event) => {
                                setFieldValue(name, event.target.checked);
                                setFieldTouched(name, true, false);
                                onChange && onChange(event);
                            }}
                            checked={value}
                            {...restProps}
                        />
                    </div>
                );
            }}
        </Field>
    );
};

export default FormCheckbox;
