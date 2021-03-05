import React from 'react';
import { styled } from '../../shared/Theme/theme';
import maintenance from '../../../static/images/maintenance.jpg';
import { Link } from 'react-router-dom';
import { PagesRoutes } from '../../../routing/PagesRoutes';

type Props = {};

const ExceptionPage = ({}: Props) => {
    return (
        <Container>
            <Header>
                <div>הדף בשיפוצים!</div>
                <Link style={{ color: 'inherit' }} to={PagesRoutes.Home}>
                    <span style={{ fontSize: 'inherit' }} className="material-icons">
                        home
                    </span>
                </Link>
            </Header>
        </Container>
    );
};
const Container = styled.div`
    background-image: url(${maintenance});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
`;
const Header = styled.div`
    text-align: center;
    font-size: 80px;
    position: absolute;
    right: 0;
    left: 0;
    color: black;
`;
export default ExceptionPage;
