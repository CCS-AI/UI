import { RootState } from '../../../state/store/store';

const speechAudiometryInfo = (state: RootState) => state.SpeechAudiometry.spInfo;

export { default as SpeechAudiometrySelector } from './selectors';

export default {
    speechAudiometryInfo
};
