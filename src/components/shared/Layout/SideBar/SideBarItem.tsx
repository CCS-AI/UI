export {};
// import React from 'react';
// import { styled } from '../../Theme/theme';
// import calendar from '../../../../static/icons/calendar.svg';
// import dashboard from '../../../../static/icons/dashboard.svg';
// import shipments from '../../../../static/icons/shipments.svg';
// import companies from '../../../../static/icons/customers.svg';
// import grid from '../../../../static/icons/grid.svg';
// import board from '../../../../static/icons/board.svg';
// import bids from '../../../../static/icons/bids.svg';
// import messages from '../../../../static/icons/messages.svg';
// import purchaseOrders from '../../../../static/icons/purchaseOrder.svg';
// import { isItemSelected, linkItem } from './SideBar';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
// import { isEqual } from 'lodash';

// //This is the props api for this component
// export type SideBarItemProps = RouteComponentProps & {
//     text: string;
//     icon: availableIcons;
//     isSelected: boolean;
//     onClick?: () => void;
//     iconSize: number;
//     subItems?: Array<linkItem>;
// };

// export type availableIcons = 'dashboard' | 'calendar' | 'shipments' | 'companies' | 'purchaseOrders' | 'grid' | 'board' | 'bids' | 'messages';

// const SideBarItem = (props: SideBarItemProps) => {
//     return (
//         <Wrapper isSelected={props.isSelected} hasSubItems={!!props.subItems}>
//             <Body onClick={props.onClick} isSelected={props.isSelected} hasSubItems={!!props.subItems}>
//                 <IconContainer>
//                     <IconGenerator icon={props.icon} size={28 / props.iconSize} />
//                 </IconContainer>

//                 <span>{props.text}</span>
//             </Body>
//             <SubItems>
//                 {!!props.subItems &&
//                     props.isSelected &&
//                     props.subItems.map((item) => (
//                         <SideBarItem
//                             history={props.history}
//                             match={props.match}
//                             location={props.location}
//                             key={item.route}
//                             onClick={() => props.history.push(item.route)}
//                             icon={item.icon}
//                             isSelected={isItemSelected(props.history.location.pathname, item.route, item.subItems)}
//                             text={item.text}
//                             iconSize={item.iconSize}
//                         />
//                     ))}
//             </SubItems>
//         </Wrapper>
//     );
// };

// /*
//  * Helper components *
//  * Wrapper - overall style and size + controlling the text style
//  * IconGenerator - gets the icon text and generates an icon
//  */
// type BodyProps = {
//     isSelected: boolean;
//     hasSubItems: boolean;
// };

// const Wrapper = styled.div<BodyProps>`
//     width: 240px;
//     background-color: ${(props) => (props.isSelected && props.hasSubItems ? '#00375c' : 'transparent')};
//     cursor: pointer;
//     color: #fff;
//     box-sizing: border-box;
//     display: flex;
//     flex-direction: column;

//     @media screen and (max-width: 768px) {
//         height: 45px;

//         border-bottom: 3px solid ${(props) => (props.isSelected ? props.theme.colors.primary : props.theme.colors.secondary)};
//         border-left: none;
//     }
// `;

// const Body = styled.div<BodyProps>`
//     font-size: ${(props) => props.theme.fontSizes.menuItem};
//     display: flex;
//     align-items: center;
//     justify-content: space-between;

//     @media screen and (min-width: 769px) {
//         padding: 10px 0;
//         font-size: ${(props) => props.theme.fontSizes.menuItem};
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         min-height: 45px;
//         border-left: 4px solid ${(props) => (props.isSelected && !props.hasSubItems ? props.theme.colors.primary : 'transparent')};
//         background-color: ${(props) => (props.isSelected && !props.hasSubItems ? '#00375c' : 'transparent')};
//     }

//     & span {
//         flex: 1;
//         font-size: 14px;
//     }
//     @media screen and (max-width: 768px) {
//         & span {
//             display: none;
//         }
//     }
// `;
// const SubItems = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const IconContainer = styled.div`
//     width: 56px;
//     text-align: center;
// `;

// //TODO: Consider moving it to more  generic place - and use in other components
// type IconGeneratorProps = {
//     icon: availableIcons;
//     size: number;
// };
// const IconGenerator = ({ icon, size }: IconGeneratorProps) => {
//     let selected = '';

//     switch (icon) {
//         case 'dashboard':
//             selected = dashboard;
//             break;
//         case 'calendar':
//             selected = calendar;
//             break;
//         case 'companies':
//             selected = companies;
//             break;
//         case 'purchaseOrders':
//             selected = purchaseOrders;
//             break;
//         case 'grid':
//             selected = grid;
//             break;
//         case 'board':
//             selected = board;
//             break;
//         case 'bids':
//             selected = bids;
//             break;
//         case 'messages':
//             selected = messages;
//             break;
//         default:
//             selected = shipments;
//     }

//     return <StyledIcon src={selected} alt="" width={size} />;
// };

// const StyledIcon = styled.img`
//     align-self: center;
// `;

// export default React.memo(withRouter(SideBarItem), (prevProps, nextProps) => {
//     return isEqual(prevProps, nextProps);
// });
