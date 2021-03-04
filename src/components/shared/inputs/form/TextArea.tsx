import React from 'react';
import { Field, FieldProps } from 'formik';
import { TextInput } from '../base';

type Props = {
    name: string;
};

const FormTextArea = ({ name, ...restProps }: Props) => {
    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => {
                const { touched, error } = meta;
                const hasError = touched && error !== undefined;
                return (
                    <div>
                        <TextInput field={field} hasError={hasError} error={error} multiline {...restProps} />
                    </div>
                );
            }}
        </Field>
    );
};
export default FormTextArea;
