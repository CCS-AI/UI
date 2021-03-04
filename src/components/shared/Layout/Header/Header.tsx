import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { styled } from '../../Theme/theme';
import { userInfo } from '../../../../models/entities/user';
import { RootState } from '../../../../state/store/store';
import { userSelectors } from '../../../../state/ducks/user/selectors';

type Props = RouteComponentProps & {
    userInfo?: userInfo;
    fetchUserInfo: () => void;
    logout: () => void;
};

const HeaderConnected = ({ userInfo, fetchUserInfo, history, logout }: Props) => {
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return (
        <HeaderContainer>
            <StyledLogo src={''} alt="CCS" />
            <RightBar></RightBar>
        </HeaderContainer>
    );
};
const mapStateToProps = (state: RootState) => ({
    userInfo: userSelectors.userInfo(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUserInfo: () => dispatch.user.fetchUserInfo(),
    logout: () => dispatch.authentication.logout()
});

const HeaderContainer = styled.div`
    height: 100%;
    margin-left: 10px;
    position: relative;

    @media screen and (max-width: 768px) {
        margin-left: 0;
    }
`;
const RightBar = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    @media screen and (max-width: 576px) {
        padding-right: 10px;
    }
`;
const StyledLogo = styled.img`
    width: 175px;
    height: 30px;
    margin-left: 14px;
    margin-top: 18px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderConnected));
