import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { PagesRoutes } from '../../../../routing/PagesRoutes';
import { getPermissions, hasPermissionToCategory, hasPermissionToHeader, Permission } from '../../../../models/entities/Permissions';
import { IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { styled } from '../../Theme/theme';

export interface SideBarProps {
    open: boolean;
    image: string;
    title: string;
    permission?: number;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SIDEBAR_CATEGORIES = ['פעולות על מטופלים', 'פעולות על מטפלים', 'פעולות על בדיקות'];
export const SIDEBAR_HEADERS = ['מטפלים', 'מטופלים', 'בדיקות'];

export const SideBar = ({ setOpenSideBar, open, image, title, permission = Permission.UNDEFINED }: SideBarProps) => {
    return (
        <ProSidebar width="240px" rtl={true} collapsed={!open} className={'pro-sidebar hide-on-print'} style={{ color: 'white' }} image={image}>
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 13,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {title}
                </div>
            </SidebarHeader>
            <Menu iconShape="square">
                <MenuItem className={'SideHeader'}>
                    <Link to={PagesRoutes.Home} />
                    מסך הבית
                </MenuItem>
                <MenuItem className={'SideHeader'} hidden={hasPermissionToHeader(permission, 'מטופלים')}>
                    מטופלים
                </MenuItem>
                <SubMenu title="פעולות על מטופלים" className={'Menu'} hidden={hasPermissionToCategory(permission, 'פעולות על מטופלים')}>
                    <MenuItem hidden={!getPermissions()[permission].includes(PagesRoutes.Patients)}>
                        הצגת כל המטופלים
                        <Link to={PagesRoutes.Patients} />
                    </MenuItem>
                    <MenuItem hidden={!getPermissions()[permission].includes(PagesRoutes.CreatePatient)}>
                        רישום מטופל חדש
                        <Link to={PagesRoutes.CreatePatient} />
                    </MenuItem>
                </SubMenu>
                <MenuItem className={'SideHeader'} hidden={hasPermissionToHeader(permission, 'בדיקות')}>
                    בדיקות
                </MenuItem>
                <SubMenu title="פעולות על בדיקות" className={'Menu'} hidden={hasPermissionToCategory(permission, 'פעולות על בדיקות')}>
                    <MenuItem>עוד דברים 2</MenuItem>
                    <MenuItem>
                        אליאל טסט
                        <Link to={PagesRoutes.CreateExamination} />
                    </MenuItem>
                </SubMenu>
                <MenuItem className={'SideHeader'} hidden={hasPermissionToCategory(permission, 'פעולות על מטפלים')}>
                    מטפלים
                </MenuItem>
                <SubMenu title="מטפלים" className={'Menu'} hidden={hasPermissionToHeader(permission, 'מטפלים')}>
                    <MenuItem hidden={!getPermissions()[permission].includes(PagesRoutes.RegisterExaminer)}>
                        רישום מטפל חדש
                        <Link to={PagesRoutes.RegisterExaminer} />
                    </MenuItem>
                </SubMenu>
            </Menu>
            <SidebarOpenButton onClick={() => setOpenSideBar(!open)}>
                <IconButton color="inherit">{open ? <ArrowForward /> : <ArrowBack />}</IconButton>
            </SidebarOpenButton>
        </ProSidebar>
    );
};
const SidebarOpenButton = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 15px;
`;
