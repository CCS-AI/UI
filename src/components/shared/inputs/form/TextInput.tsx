import React from 'react';
import TextInput, { BaseProps } from '../base/TextInput';
import { Field, FieldProps } from 'formik';

type Props = BaseProps & {
    name: string;
};

const FormTextInput = ({ name, ...restProps }: Props) => {
    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => {
                const { touched, error } = meta;
                const hasError = touched && error !== undefined;
                return (
                    <div>
                        <TextInput field={field} hasError={hasError} error={error} {...restProps} />
                    </div>
                );
            }}
        </Field>
    );
};

export default FormTextInput;
