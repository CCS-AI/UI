import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../state/store/store';
import { SpeechAudiometryTable } from '../SpeechAudiometry/components/SpeechAudiometryTable';
import { speechAudiometry } from '../../../models/entities/SP';
import { SpeechAudiometrySelector } from '../../../state/ducks/speechAudiometry/selectors';

export const SpeechAudiometryDetails = ({ UpdateSpeechAudiometry }: Props) => {
    useEffect(() => {}, []);
    return (
        <>
            <div>
                <h3>Speech Audiometry</h3>
                {UpdateSpeechAudiometry ? (
                    <SpeechAudiometryTable rowsSP={InitRows} columnsSP={InitColumns} pageSize={6} UpdateSpeechAudiometry={UpdateSpeechAudiometry} />
                ) : (
                    <SpeechAudiometryTable rowsSP={InitRows} columnsSP={InitColumns} pageSize={6} UpdateSpeechAudiometry={undefined} />
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    spInfo: SpeechAudiometrySelector.speechAudiometryInfo(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    UpdateSpeechAudiometry: (sp: speechAudiometry) => dispatch.speechAudiometry.setSpeechAudiometry(sp)
});
export default connect(mapStateToProps, mapDispatchToProps)(SpeechAudiometryDetails);

type Props = {
    // spInfo?: speechAudiometry;
    UpdateSpeechAudiometry?: (sp: speechAudiometry) => void;
    //setSpeechAudio :(sp: speechAudiometry) => void;
};

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
