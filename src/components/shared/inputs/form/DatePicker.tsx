export {};
// import React from 'react';
// import { Field } from 'formik-antd';
// import DatePicker, { BaseProps } from '../base/DatePicker';
// import { FieldProps } from 'formik';
// import moment from 'moment';
// import { ErrorText } from '.';

// type Props = BaseProps & {
//     name: string;
// };

// const FormDatePicker = ({ name, onChange, ...restProps }: Props) => {
//     return (
//         <Field name={name}>
//             {({ field: { value }, meta, form: { setFieldValue, setFieldTouched } }: FieldProps) => {
//                 const { touched, error } = meta;
//                 const hasError = touched && error !== undefined;
//                 return (
//                     <div>
//                         <DatePicker
//                             hasError={hasError}
//                             onChange={(date: moment.Moment, dateString: String) => {
//                                 setFieldValue(name, date ? date.toISOString() : null);
//                                 setFieldTouched(name, true, false);
//                                 onChange && onChange(date, dateString);
//                             }}
//                             value={value}
//                             {...restProps}
//                         />
//                         <ErrorText>{hasError && error}</ErrorText>
//                     </div>
//                 );
//             }}
//         </Field>
//     );
// };

// export default FormDatePicker;
