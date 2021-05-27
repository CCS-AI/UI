import React from 'react';
import { styled } from '../Theme/theme';
import loaderImg from '../../../static/images/ccs-icon.png';
import { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

type LoaderStyle = {
    width?: string;
    marginTop?: string;
    showText?: boolean;
    color?: string;
};
export const BtnLoader = ({ width, marginTop, color }: LoaderStyle) => {
    return (
        <LoaderWrapper width={width} marginTop={marginTop} color={color}>
            <CircularProgress color="inherit" />
        </LoaderWrapper>
    );
};
const Loader = ({ width, marginTop, showText, color }: LoaderStyle) => {
    return (
        <LoaderWrapper width={width} marginTop={marginTop} color={color}>
            <PageLoaderWrapper>
                <img width="50px" src={loaderImg} alt="ccs loader" />
                <CircularProgress style={{ position: 'absolute' }} size={55} color="inherit" />
            </PageLoaderWrapper>
            {showText && <span style={{ color: 'inherit' }}>טוען...</span>}
        </LoaderWrapper>
    );
};
BtnLoader.defaultProps = {
    width: '20px',
    marginTop: '0px',
    showText: false,
    color: 'white'
};
Loader.defaultProps = {
    showText: true,
    marginTop: '0px',
    color: '#64bae3ad'
};
const PageLoaderWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Rotate = keyframes`
    to {transform: rotateZ(720deg);}
`;

const LoaderWrapper = styled.div<LoaderStyle>`
    display: flex;
    width: 100%;
    margin-top: ${(props) => props.marginTop ?? '150px'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color};
    & span {
        font-size: 18px;
        margin-top: 16px;
        color: black;
    }

    & img {
        // width: ${(props) => props.width ?? '64px'};
        // animation: ${Rotate} 4s linear infinite;
    }
`;

export default Loader;
