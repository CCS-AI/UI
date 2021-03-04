export {};
// import React, { PropsWithChildren, useEffect, useState } from 'react';
// import SideBarItem, { availableIcons } from './SideBarItem';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { PagesRoutes } from '../../../../routing/PagesRoutes';
// import { connect } from 'react-redux';
// import { Language, languages } from '../../../../models/entities/language';
// import { styled } from '../../../shared/Theme/theme';
// import { RootState } from '../../../../state/store/store';
// import { localizationSelectors } from '../../../../state/ducks/localization/selectors';
// import { headerSelectors } from '../../../../state/ducks/header/selectors';
// import { makeStyles, Theme, createStyles, Drawer, IconButton } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import useWindowSize from '../../../../hooks/windowSize';

// import clsx from 'clsx';
// import { userSelectors } from '../../../../state/ducks/user/selectors';
// import { featureFlagsModel } from '../../../../models/entities/company/settings';

// export type linkItem = {
//     icon: availableIcons;
//     route: string;
//     text: string;
//     iconSize: number;
//     subItems?: Array<linkItem>;
// };
// type Props = RouteComponentProps & {
//     onLanguageSelected: (language: Language) => void;
//     localizations: any;
//     isOpen: boolean;
//     setSideBarOpen: (open: boolean) => void;
//     featureFlags?: featureFlagsModel;
//     printMode?: boolean;
// };

// export const isItemSelected = (currentURL: string, itemRoute: string, subItems?: Array<linkItem>) => {
//     if (currentURL === '/' && itemRoute === '/') return true;
//     if (itemRoute === '/' && currentURL !== '/') return false;

//     let oneOfSubItemsIsSelected = false;
//     if (subItems) {
//         oneOfSubItemsIsSelected = subItems.some((sub) => isItemSelected(currentURL, sub.route, sub.subItems));
//     }
//     return currentURL.indexOf(itemRoute) !== -1 || oneOfSubItemsIsSelected;
// };

// const drawerWidth = 240;

// const SideBar = ({
//     onLanguageSelected,
//     localizations,
//     isOpen,
//     setSideBarOpen,
//     history,
//     featureFlags,
//     printMode,
//     children
// }: PropsWithChildren<Props>) => {
//     const useStyles = makeStyles((theme: Theme) =>
//         createStyles({
//             root: {
//                 display: 'flex'
//             },
//             drawer: {
//                 width: drawerWidth,
//                 flexShrink: 0,
//                 whiteSpace: 'nowrap',
//                 [theme.breakpoints.down(769)]: {
//                     display: 'none',
//                     width: 0
//                 }
//             },
//             paper: {
//                 paddingTop: '64px',
//                 zIndex: 0,
//                 border: 'none',
//                 overflowX: 'hidden'
//             },
//             drawerOpen: {
//                 width: drawerWidth,
//                 transition: theme.transitions.create(['width', 'background-image'], {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.shorter
//                 }),
//                 background: '#252b4a'

//                 // backgroundImage: 'linear-gradient(to bottom, #394372, #008ac9)'
//                 // background: 'linear-gradient(180deg, #252B4A 70%, #008AC9 100%)'
//             },
//             drawerClose: {
//                 transition: theme.transitions.create(['width', 'background-image'], {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.shorter
//                 }),
//                 width: 60,
//                 background: '#252b4a'
//                 // background: 'linear-gradient(180deg, #252B4A 70%, #008AC9 100%)'
//             },
//             content: {
//                 flexGrow: 1,
//                 position: 'relative',
//                 transition: theme.transitions.create('margin', {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.shorter
//                 }),
//                 marginLeft: 60,
//                 [theme.breakpoints.down(769)]: {
//                     marginLeft: 0
//                 }
//             },
//             contentShift: {
//                 transition: theme.transitions.create('margin', {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.shorter
//                 }),
//                 marginLeft: printMode ? 0 : drawerWidth
//             },
//             bottomSection: {
//                 bottom: 0,
//                 position: 'absolute',
//                 width: '100%',
//                 paddingRight: '4px'
//             },
//             arrowIcon: {
//                 width: '100%',
//                 display: 'flex',
//                 justifyContent: 'flex-end'
//             }
//         })
//     );

//     const classes = useStyles();
//     const [windowWidth] = useWindowSize();
//     useEffect(() => {
//         windowWidth > 1300 && !isItemSelected(history.location.pathname, PagesRoutes.ShipmentsBoard)
//             ? !isOpen && handleDrawerOpen()
//             : isOpen && handleDrawerClose();
//     }, [windowWidth]);
//     const handleDrawerOpen = () => {
//         setSideBarOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setSideBarOpen(false);
//     };

//     const buildItem = (icon: availableIcons, itemRoute: string, text: string, iconSize: number, subItems?: Array<linkItem>): linkItem => {
//         const linkItem: linkItem = {
//             icon,
//             route: itemRoute,
//             text,
//             iconSize,
//             subItems
//         };

//         return linkItem;
//     };

//     const sideBarDefault: Array<linkItem> = [
//         buildItem('dashboard', PagesRoutes.Home, localizations.links['dashboard'], 1),
//         buildItem('shipments', PagesRoutes.Shipments, localizations.links['shipments'], 1, [
//             buildItem('grid', PagesRoutes.Shipments, 'Grid', 1.2),
//             buildItem('board', PagesRoutes.ShipmentsBoard, 'Board', 1.2)
//         ]),
//         // buildItem('calendar', PagesRoutes.Calendar, localizations.links['calendar']),
//         buildItem('companies', PagesRoutes.Companies, localizations.links['companies'], 1)
//     ];
//     // features
//     if (featureFlags?.CHAT && windowWidth < 768) sideBarDefault.push(buildItem('messages', PagesRoutes.Messages, localizations.links['messages'], 1));
//     if (featureFlags?.PO) sideBarDefault.push(buildItem('purchaseOrders', PagesRoutes.PurchaseOrders, localizations.links['purchaseOrders'], 1));
//     if (featureFlags?.BIDS) sideBarDefault.push(buildItem('bids', PagesRoutes.Bids, localizations.links['bids'], 1));

//     const handleClick = (route: string) => {
//         history.push(route);
//     };
//     return (
//         <div style={{ height: '100%' }}>
//             {!printMode && (
//                 <MobileBarWrapper>
//                     {sideBarDefault.map((item) => (
//                         <SideBarItem
//                             key={item.route}
//                             onClick={() => handleClick(item.route)}
//                             icon={item.icon}
//                             isSelected={isItemSelected(history.location.pathname, item.route)}
//                             text={item.text}
//                             iconSize={1}
//                         />
//                     ))}
//                 </MobileBarWrapper>
//             )}
//             {!printMode && (
//                 <Drawer
//                     variant="permanent"
//                     className={clsx(classes.drawer, {
//                         [classes.drawerOpen]: isOpen,
//                         [classes.drawerClose]: !isOpen
//                     })}
//                     classes={{
//                         paper: clsx(classes.paper, {
//                             [classes.drawerOpen]: isOpen,
//                             [classes.drawerClose]: !isOpen
//                         })
//                     }}
//                 >
//                     <div>
//                         {sideBarDefault.map((item) => (
//                             <SideBarItem
//                                 key={item.route}
//                                 onClick={() => handleClick(item.route)}
//                                 icon={item.icon}
//                                 isSelected={isItemSelected(history.location.pathname, item.route, item.subItems)}
//                                 text={item.text}
//                                 subItems={item.subItems}
//                                 iconSize={item.iconSize}
//                             />
//                         ))}
//                     </div>
//                     <div className={classes.bottomSection}>
//                         <LanguageSelector>
//                             <span onClick={() => onLanguageSelected(languages.English)}>EN</span> |{' '}
//                             <span onClick={() => onLanguageSelected(languages.Spanish)}>ES</span>
//                         </LanguageSelector>
//                         <div className={classes.arrowIcon}>
//                             <IconButton onClick={isOpen ? handleDrawerClose : handleDrawerOpen} style={{ width: '54px', color: '#fff', right: 0 }}>
//                                 {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                             </IconButton>
//                         </div>
//                     </div>
//                 </Drawer>
//             )}
//             <main
//                 className={clsx(classes.content, {
//                     [classes.contentShift]: isOpen
//                 })}
//                 style={{ height: '100%' }}
//             >
//                 {children}
//             </main>
//         </div>
//     );
// };

// const MobileBarWrapper = styled.div`
//     display: none;
//     @media screen and (max-width: 768px) {
//         display: initial;
//         height: 40px;
//         display: flex;
//         width: 100%;
//         text-align: left;
//         box-sizing: border-box;
//         bottom: 0px;
//         position: fixed;
//         background-color: #252b4a;
//         z-index: 1000;
//         justify-content: space-around;

//         & div {
//             display: flex;
//             height: 40px;
//             justify-content: center;
//             cursor: pointer;
//             color: #fff;
//             box-sizing: border-box;
//         }
//     }

//     @media screen and (max-height: 400px) {
//         display: none;
//     }
// `;

// const LanguageSelector = styled.div`
//     font-size: ${(props) => props.theme.fontSizes.languageSelector};
//     color: ${(props) => props.theme.colors.sideBarItem};
//     font-weight: bold;
//     text-align: center;
//     cursor: pointer;

//     @media screen and (max-width: 768px) {
//         display: none;
//     }
// `;

// const mapStateToProps = (state: RootState) => ({
//     localizations: localizationSelectors.sidebar(state),
//     isOpen: headerSelectors.sideBarOpen(state),
//     featureFlags: userSelectors.featureFlags(state)
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     onLanguageSelected: (language: Language) => dispatch.localization.changeLanguage(language),
//     setSideBarOpen: (open: boolean) => dispatch.header.setSideBarOpen(open)
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
