export {};
// import React from 'react';
// import { DatePicker as AntDatePicker } from 'antd';
// import moment from 'moment';
// import styled, { CSSProperties } from 'styled-components';
// import { getPopupContainerPopoverBug } from '.';

// export type BaseProps = {
//     value?: Date;
//     style?: CSSProperties;
//     placeHolder?: string;
//     onChange?: any;
//     hasError?: boolean;
//     width?: string;
//     height?: string;
//     preventPopoverBug?: boolean;
//     showTime?: boolean;
// };

// const DatePicker = ({ value, style, placeHolder, onChange, hasError, width, height, preventPopoverBug, showTime }: BaseProps) => {
//     return (
//         <Conatiner hasError={hasError}>
//             <AntDatePicker
//                 getPopupContainer={(trigger: any) => getPopupContainerPopoverBug(trigger, preventPopoverBug)}
//                 placeholder={placeHolder}
//                 onChange={onChange}
//                 style={{ width, height, ...style }}
//                 value={value ? moment(value) : undefined}
//                 showTime={showTime}
//                 onBlur={(elem: React.FocusEvent<HTMLInputElement>) => {
//                     let value = moment(elem.target.value);
//                     if (value && value.isValid() && onChange) {
//                         onChange(value, elem.target.value);
//                     }
//                 }}
//             />
//         </Conatiner>
//     );
// };

// DatePicker.defaultProps = {
//     width: '100%',
//     height: 'auto'
// };
// type ContainerProps = {
//     hasError?: boolean;
// };
// const Conatiner = styled.div<ContainerProps>`
//     position: relative;
//     & .ant-picker {
//         border-radius: 70px !important;
//         border-color: ${(props) => (props.hasError ? 'red' : props.theme.colors.primaryBlue)} !important;
//     }
// `;

// export default DatePicker;
