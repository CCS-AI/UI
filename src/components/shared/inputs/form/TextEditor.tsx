export {};
// import React from 'react';
// import { Field } from 'formik-antd';
// import { FieldProps } from 'formik';
// import TextEditor from '../base/TextEditor';
// import { ErrorText } from '.';
// import { BaseProps } from '../base/TextEditor';

// type Props = BaseProps & {
//     name: string;
// };

// const FormTextEditor = ({ name, ...restProps }: Props) => (
//     <Field name={name}>
//         {({ field, meta }: FieldProps) => {
//             const { touched, error } = meta;
//             const hasError = touched && error !== undefined;
//             return (
//                 <div>
//                     <TextEditor hasError={hasError} {...restProps} />
//                     <ErrorText>{hasError && error}</ErrorText>
//                 </div>
//             );
//         }}
//     </Field>
// );

// export default FormTextEditor;
