import React from 'react';
import { styled } from '../Theme/theme';
import loaderImg from '../../../static/images/hearing.png';
import { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

type LoaderStyle = {
    width?: string;
    marginTop?: string;
    showText?: boolean;
    color?: string;
};

const Loader = ({ width, marginTop, showText, color }: LoaderStyle) => {
    return (
        <LoaderWrapper width={width} marginTop={marginTop}>
            {/* <img src={loaderImg} alt="ccs loader" /> */}
            <CircularProgress color="inherit" />
            {showText && <span>Loading...</span>}
        </LoaderWrapper>
    );
};
Loader.defaultProps = {
    showText: true,
    color: '#1d2e3d'
};
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
        width: ${(props) => props.width ?? '64px'};
        animation: ${Rotate} 4s linear infinite;
    }
`;

export default Loader;
