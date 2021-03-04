export {};
// import React from 'react';
// import { useHistory } from 'react-router-dom';

// type Props = {
//     status: any;
//     title?: string;
//     subTitle?: string;
//     goBackPath?: string;
//     localization?: any;
// };

// const ExceptionPage = ({ status, title, subTitle, localization, goBackPath }: Props) => {
//     const history = useHistory();

//     const resultStatus: ResultStatusType = isResultStatusType(status) ? status : status == 401 ? 403 : 500;
//     return (
//         <Result
//             status={resultStatus}
//             title={localization?.exceptions[status]?.title || title || ''}
//             subTitle={localization?.exceptions[status]?.sub_title || subTitle || ''}
//             extra={
//                 goBackPath && (
//                     <Button
//                         type="primary"
//                         onClick={() => {
//                             history.push(goBackPath);
//                         }}
//                     >
//                         {localization?.exceptions.back_btn || 'Go back'}
//                     </Button>
//                 )
//             }
//         />
//     );
// };

// export const isResultStatusType = (x: any): x is ResultStatusType => [403, 404, 500].includes(x);

// export default ExceptionPage;
