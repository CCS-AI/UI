import React from 'react';
import { styled } from '../Theme/theme';
import loaderImg from '../../../static/images/hearing.png';
import { keyframes } from 'styled-components';

type LoaderStyle = {
    width?: string;
    marginTop?: string;
    showText?: boolean;
};

const Loader = ({ width, marginTop, showText }: LoaderStyle) => {
    return (
        <LoaderWrapper width={width} marginTop={marginTop}>
            <img src={loaderImg} alt="ccs loader" />
            {showText && <span>Loading...</span>}
        </LoaderWrapper>
    );
};
Loader.defaultProps = {
    showText: true
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

    & span {
        font-size: 18px;
        margin-top: 16px;
        color: ${(props) => props.theme.colors.primaryBlue};
    }

    & img {
        width: ${(props) => props.width ?? '64px'};
        animation: ${Rotate} 4s linear infinite;
    }
`;

export default Loader;
