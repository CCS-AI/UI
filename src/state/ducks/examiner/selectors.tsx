import { RootState } from '../../../state/store/store';

const examinerInfo = (state: RootState) => state.examiner.examinerInfo;
const examinersName = (state: RootState) => state.examiner.allExaminers;

export { default as userSelectors } from './selectors';

export default {
    examinerInfo,
    examinersName
};
