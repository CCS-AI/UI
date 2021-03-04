import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import styled from 'styled-components';

type Props = {
    onChange: (date: MaterialUiPickersDate) => void;
    value: Date;
};

const StaticDateTimePicker = (props: Props) => {
    return (
        <DateTimePicker
            autoOk
            variant="static"
            value={props.value}
            onChange={props.onChange}
            dateRangeIcon={
                <Container>
                    <StyledIcon className="material-icons">today</StyledIcon>
                    <span>Date</span>
                </Container>
            }
            timeIcon={
                <Container>
                    <StyledIcon className="material-icons">schedule</StyledIcon>
                    <span>Time</span>
                </Container>
            }
        />
    );
};
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: none;
    font-size: 15px;
`;
const StyledIcon = styled.span`
    margin-right: 5px;
    font-size: 22px;
`;
export default StaticDateTimePicker;
