import React, { PropsWithChildren, useState } from 'react';
import Header from './Header/Header';
// import SideBar from './SideBar/SideBar';
import { styled } from '../Theme/theme';
import useWindowSize from '../../../hooks/windowSize';
import { SideBar } from './SideBar_/SideBar';
import { Permission } from '../../../models/entities/Permissions';
import SidebarGuard from '../guards/SidebarGuard';

type Props = {};

const Layout = ({ children }: PropsWithChildren<Props>) => {
    const [windowWidth] = useWindowSize();
    //const [pageMarginRight, setPageMarginRight] = useState(240);
    const [openSideBar, setOpenSideBar] = useState(true);

    const pageMarginRightOpen = 240;
    const pageMarginRightClose = 80;

    return (
        <LayoutContainer>
            <HeaderWrapper className="hide-on-print">
                <Header />
            </HeaderWrapper>
            {/* <ResponsiveDrawerConnected> */}
            {/* <SideBar printMode={printMode}> */}
            <Wrapper className="main-wrapper">
                <SidebarGuard>
                    <SideBar
                        open={openSideBar}
                        setOpenSideBar={setOpenSideBar}
                        image={'https://www.rcac.org/wp-content/uploads/2016/08/sidebar-ad-background.jpg'}
                        title={'מערכת לניהול בדיקות שמיעה'}
                    />
                </SidebarGuard>

                <ContentWrapper className="content-wrapper" marginRight={openSideBar ? pageMarginRightOpen : pageMarginRightClose}>
                    {children}
                </ContentWrapper>
            </Wrapper>
        </LayoutContainer>
    );
};
const HeaderWrapper = styled.div<{ printMode?: boolean }>`
    ${(props) => (props.printMode ? 'visibility:hidden;' : '')}
    height: 64px;
    background-color: #fff;
    display: block;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    -webkit-backface-visibility: hidden;

    position: fixed;

    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2);
    z-index: 1004;

    @media screen and (max-width: 768px) {
        left: 0;
        width: 100%;
    }
`;

const LayoutContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const Wrapper = styled.div`
    height: calc(100% - 64px);
    right: 0;
    top: 64px;
    display: flex;
    width: 100%;
    position:absolute;
}
`;
const ContentWrapper = styled.div<{ marginRight?: number }>`
    width: calc(100% - ${(props) => props.marginRight}px);
    overflow-y: overlay;
    z-index: 50;
    height: 100%;
    background: linear-gradient(360deg, rgb(191 227 244) 0%, rgb(105 208 80 / 15%) 100%);
`;
export default Layout;
