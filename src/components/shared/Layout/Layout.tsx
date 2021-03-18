import React, { PropsWithChildren } from 'react';
import Header from './Header/Header';
// import SideBar from './SideBar/SideBar';
import { styled } from '../Theme/theme';
import useWindowSize from '../../../hooks/windowSize';

type Props = {};

const Layout = ({ children }: PropsWithChildren<Props>) => {
    const [windowWidth] = useWindowSize();

    return (
        <LayoutContainer>
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            {/* <ResponsiveDrawerConnected> */}
            {/* <SideBar printMode={printMode}> */}
            <ContentWrapper>{children}</ContentWrapper>
            {/* </SideBar> */}
            {/* </ResponsiveDrawerConnected> */}
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
`;
const ContentWrapper = styled.div`
    width: 100%;
    overflow-y: overlay;
    z-index: 50;
    height: calc(100% - 64px);
    margin-left: auto;
    position: absolute;
    top: 64px;
    @media screen and (max-width: 768px) {
        position: fixed;
        width: 100%;
        height: calc(100% - 40px - 64px);
    }
`;

export default Layout;
