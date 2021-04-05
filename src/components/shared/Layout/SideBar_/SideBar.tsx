import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { PagesRoutes } from '../../../../routing/PagesRoutes';

export interface SideBarProps {
    open: boolean;
    onClick: () => void;
    image: string;
    title: string;
}

export const SideBar = ({ onClick, open, image, title }: SideBarProps) => {
    return (
        <ProSidebar rtl={true} collapsed={!open} className={'pro-sidebar'} style={{ paddingTop: 64 }} onClick={() => onClick()} image={image}>
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
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
                <MenuItem className={'SideHeader'}>מטופלים</MenuItem>
                <SubMenu title="פעולות על מטופלים" className={'Menu'}>
                    <MenuItem>
                        הצגת כל המטופלים
                        <Link to={'/patients'} />
                    </MenuItem>
                    <MenuItem>
                        רישום מטופל חדש
                        <Link to={PagesRoutes.CreatePatient} />
                    </MenuItem>
                </SubMenu>
                <MenuItem className={'SideHeader'}>בדיקות</MenuItem>
                <SubMenu title="פעולות על בדיקות" className={'Menu'}>
                    <MenuItem>עוד דברים</MenuItem>
                    <MenuItem>עוד דברים 2</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    );
};
