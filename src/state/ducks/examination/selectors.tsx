import { RootState } from '../../../state/store/store';

const examinationInfo = (state: RootState) => state.examination.examinationInfo;

export { default as examinationSelector } from './selectors';

export default {
    examinationInfo
};
