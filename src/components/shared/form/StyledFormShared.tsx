import React from 'react';
import { Button, Card } from '@material-ui/core';
import { styled } from '../Theme/theme';

export const FormCard = styled(Card)`
    padding: 60px;
    width: 50%;
    margin: 20px auto;
`;
export const FormHeader = styled.div`
    font-size: 30px;
    background: #bfe3f4;
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: #1c2e3b;
`;
export const Flex = styled.div`
    display: flex;
    align-items: center;
    > * {
        flex: 1;
    }
    > *:nth-child(n + 2):last-child {
        margin-right: 20px;
    }
`;
export const TableCard = styled(Card)`
    padding: 60px;
    width: 80%;
    margin: 20px auto;
`;
export const TableHeader = styled.div`
    font-size: 30px;
    background: #bfe3f4;
    height: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: #1c2e3b;
`;
export const RoundedButton = styled(Button)`
    border-radius: 42px !important;
`;
export const SuccessContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    flex-direction: column;
    margin-top: 50px;
    .material-icons {
        font-size: 120px;
        color: #96d1eb;
    }
`;
