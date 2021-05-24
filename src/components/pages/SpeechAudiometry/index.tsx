import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../state/store/store';
import { SpeechAudiometryTable } from '../SpeechAudiometry/components/SpeechAudiometryTable';
import { speechAudiometry } from '../../../models/entities/SP';
type Props = {
    setSpInfo: React.Dispatch<React.SetStateAction<speechAudiometry | undefined>>;
};

export const SpeechAudiometryDetails = ({ setSpInfo }: Props) => {
    return (
        <>
            <div>
                <h3>Speech Audiometry</h3>
                <SpeechAudiometryTable rowsSP={InitRows} columnsSP={InitColumns} pageSize={6} setSpInfo={setSpInfo} />
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SpeechAudiometryDetails);

const InitColumns = [
    { field: 'empty', headerName: '--', width: 150, editable: false },
    { field: 'Rt', headerName: 'Rt', type: 'number', width: 150, editable: true },
    { field: 'MaskRt', headerName: 'MaskRt', type: 'number', width: 150, editable: true },
    { field: 'Lt', headerName: 'Lt', type: 'number', width: 150, editable: true },
    { field: 'MaskLt', headerName: 'MaskLt', type: 'number', width: 150, editable: true },
    { field: 'SF', headerName: 'SF', type: 'string', width: 150, editable: true }
];

const InitRows = [
    {
        id: 1,
        empty: 'SRT_db',
        Rt: 0,
        MaskRt: 0,
        Lt: '0',
        MaskLt: 0,
        SF: ' '
    },
    {
        id: 2,
        empty: 'Disc %',
        Rt: 0,
        MaskRt: 0,
        Lt: '0',
        MaskLt: 0,
        SF: ' '
    },
    {
        id: 3,
        empty: 'dB',
        Rt: 0,
        MaskRt: 0,
        Lt: '0',
        MaskLt: 0,
        SF: ' '
    },
    {
        id: 4,
        empty: 'MCL',
        Rt: 0,
        MaskRt: 0,
        Lt: '0',
        MaskLt: 0,
        SF: ' '
    },
    {
        id: 5,
        empty: 'UCL',
        Rt: 0,
        MaskRt: 0,
        Lt: '0',
        MaskLt: 0,
        SF: ' '
    },
    {
        id: 6,
        empty: 'VDL',
        Rt: 0,
        MaskRt: 0,
        Lt: '0',
        MaskLt: 0,
        SF: ' '
    }
];
