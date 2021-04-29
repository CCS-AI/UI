import { Avatar, ButtonBase, Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userInfo } from '../../../models/entities/user';
import { userSelectors } from '../../../state/ducks/user/selectors';
import { RootState } from '../../../state/store/store';
import { styled } from '../../shared/Theme/theme';
import hearingBG from '../../../static/images/hearingbg.jpeg';
import { useHistory } from 'react-router';
import { PagesRoutes } from '../../../routing/PagesRoutes';

type Props = {
    userInfo?: userInfo;
};
type ActionType = {
    icon?: string;
    color?: string;
    text?: string;
    onClick?: () => void;
    img?: string;
};
const Home = ({ userInfo }: Props) => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    if (!userInfo) return null;
    const fullName = userInfo.firstName + ' ' + userInfo.lastName;
    const actions: ActionType[] = [
        {
            color: 'rgb(119 0 0',
            text: 'יצירת מטופל חדש',
            onClick: () => history.push(PagesRoutes.CreatePatient),
            icon: 'face'
        },
        {
            color: 'rgb(99 255 183',
            text: 'צפייה במטופלים',
            onClick: () => history.push(PagesRoutes.Patients),
            icon: 'person_search'
        },
        {
            color: 'rgb(69 221 255',
            text: 'יצירת מטפל חדש',
            onClick: () => history.push(PagesRoutes.RegisterExaminer),
            icon: 'person_add'
        },
        {
            icon: 'engineering'
        },
        {
            icon: 'engineering'
        },
        {
            icon: 'engineering'
        },
        {
            icon: 'engineering'
        }
    ];
    return (
        <Container>
            <BlurImage></BlurImage>
            <WelcomeTexts>
                <UserName>שלום {fullName}</UserName>
                <WelcomeMessage>ברוך הבא למערכת , מה ברצונך לעשות?</WelcomeMessage>
            </WelcomeTexts>
            <BoxContainer>
                <ActionsContainer>
                    {actions.map((item, index: number) => {
                        const WHITE_COLOR = 'rgb(255 255 255';
                        return (
                            <Zoom key={index} in={true} timeout={{ enter: 150 * index, exit: 150 * index }}>
                                <ButtonBaseCustom maincolor={item.color || WHITE_COLOR} onClick={item.onClick}>
                                    <ActionCard maincolor={item.color || WHITE_COLOR}>
                                        <IconContainer>
                                            {loading ? (
                                                <Skeleton variant="circle" width="inherit" height="inherit" animation="wave" />
                                            ) : item.icon ? (
                                                <CardIconWrapper>
                                                    <span className="material-icons" style={{ fontSize: '40px' }}>
                                                        {item.icon}
                                                    </span>
                                                </CardIconWrapper>
                                            ) : (
                                                <CardIconWrapper src={item.img} />
                                            )}
                                        </IconContainer>
                                        <TextContainer>
                                            {loading || !item.text ? (
                                                <Skeleton width="100px" height="20px" animation="wave"></Skeleton>
                                            ) : (
                                                <TextStyled>{item.text}</TextStyled>
                                            )}
                                        </TextContainer>
                                    </ActionCard>
                                </ButtonBaseCustom>
                            </Zoom>
                        );
                    })}
                </ActionsContainer>
            </BoxContainer>
        </Container>
    );
};
const Container = styled.div`
    height: inherit;
    padding: 30px;
    overflow: hidden;
`;
const WelcomeTexts = styled.div`
    background: white;
    display: inline-flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    width: 35%;
`;
const UserName = styled.div`
    font-size: 30px;
    color: #25445c;
`;
const WelcomeMessage = styled.div`
    font-size: 25px;
    color: #25445c;
`;
const BoxContainer = styled.div`
    display: flex;
    height: 100%;
`;
const ActionsContainer = styled.div`
    margin: 20px auto;
    width: 50%;
    max-height: 70%;
    padding: 20px;
    position: relative;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;
const BlurImage = styled.div`
    background-image: url(${hearingBG});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(0.2px) brightness(1.1) hue-rotate(5deg) opacity(0.9) saturate(1.3) sepia(0.4);
    // filter: blur(8px);
    // -webkit-filter: blur(8px);
    height: 100%;
    width: 100%;
    position: fixed;
    right: 0;
    top: 0;
    z-index: -1;
`;
const ButtonBaseCustom = styled(ButtonBase)<{ maincolor: string }>`
    margin: 20px !important;
    color: ${(props) => props.maincolor}) !important;
`;
const ActionCard = styled.div<{ maincolor: string }>`
    width: 150px;
    height: 200px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 19px -5px ${(props) => props.maincolor} / 65%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    background: ${(props) => props.maincolor} / 30%);
    border-radius: 5px;
`;
const IconContainer = styled.div`
    width: 70px;
    height: 70px;
    flex: 3;
    display: flex;
    align-items: center;
`;
const CardIconWrapper = styled(Avatar)`
    width: inherit !important;
    height: inherit !important;
    background-color: #1a2b39 !important;
`;
const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
`;
const TextStyled = styled.div`
    font-size: 17px;
    height: 100%;
    font-weight: 500;
    font-family: 'Heebo', sans-serif !important;
`;
const mapStateToProps = (state: RootState) => ({
    userInfo: userSelectors.userInfo(state)
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
