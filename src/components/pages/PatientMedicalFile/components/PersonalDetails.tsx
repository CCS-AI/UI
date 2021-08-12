import React from 'react';
import { Gender, HMO, Patient } from '../../../../models/entities/patient';
import { formatHebDate } from '../../../../utils/date';
import { styled } from '../../../shared/Theme/theme';
import Avatar, { Props as AvatarProps } from 'avataaars';
import MaterialAvatar from '@material-ui/core/Avatar';

type Props = {
    patient: Patient;
};
export const detailNullMessage = ' *נתון לא קיים במערכת*';

const PersonalDetails = ({ patient }: Props) => {
    const gender = Gender[patient.gender];
    const avatarCommonProps: AvatarProps = {
        style: { width: '100px', height: '100px' },
        avatarStyle: 'Circle',
        clotheType: 'GraphicShirt',
        clotheColor: 'Blue02',
        graphicType: 'Bear'
    } as AvatarProps;
    return (
        <>
            {patient ? (
                <PersonalCard>
                    <Header>פרטים אישיים:</Header>
                    <AvatarContainer>
                        {!gender ? (
                            <MaterialAvatar style={{ width: '80px', height: '80px' }} />
                        ) : gender === 'MALE' ? (
                            <Avatar
                                {...avatarCommonProps}
                                topType="ShortHairShortRound"
                                hairColor="Platinum"
                                facialHairType="BeardLight"
                                facialHairColor="BlondeGolden"
                                eyebrowType="DefaultNatural"
                                mouthType="Smile"
                                skinColor="Yellow"
                            />
                        ) : (
                            <Avatar {...avatarCommonProps} />
                        )}
                    </AvatarContainer>

                    <Container>
                        <BoxContainer>
                            <Title>שם מלא:</Title>
                            <Value>{' ' + patient.firstName + ' ' + patient.lastName}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>תעודת זהות:</Title>
                            <Value>{patient.personalId ? ' ' + patient.personalId : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>תאריך לידה:</Title>
                            <Value>{patient.birth ? ' ' + formatHebDate(patient.birth) : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>מין:</Title>
                            <Value>{Gender[patient.gender] ? ' ' + Gender[patient.gender] : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>כתובת:</Title>
                            <Value>{patient.address ? ' ' + patient.address : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>מספר טלפון 1:</Title>
                            <Value>{patient.phone1 ? ' ' + patient.phone1 : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>מספר טלפון 2:</Title>
                            <Value>{patient.phone2 ? ' ' + patient.phone2 : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>מייל:</Title>
                            <Value>{patient.email ? ' ' + patient.email : detailNullMessage}</Value>
                        </BoxContainer>
                        <BoxContainer>
                            <Title>קופת חולים:</Title>
                            <Value>{HMO[patient.hmo] ? ' ' + HMO[patient.hmo] : detailNullMessage}</Value>
                        </BoxContainer>
                    </Container>
                </PersonalCard>
            ) : (
                <div></div>
            )}
        </>
    );
};

export const PersonalCard = styled.div`
    border: 1px solid #f3f3f3;
    padding: 20px 10px;
    border-radius: 5px;
    position: relative;
`;
const AvatarContainer = styled.div`
    position: absolute;
    left: -40px;
    top: -45px;
    background: white;
`;
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        width: 200px;
        max-width: 200px;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;
export const Header = styled.div`
    font-size: 21px;
    color: #1d2e3c;
    font-weight: bold;
`;
export const BoxContainer = styled.div``;
export const Title = styled.div`
    font-size: 18px;
`;
export const Value = styled.div`
    font-size: 14px;
    color: #b7b7b7;
`;

export default PersonalDetails;
