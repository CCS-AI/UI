import { RootState } from '../../../state/store/store';

const examinerInfo = (state: RootState) => state.examiner.examinerInfo;

export { default as userSelectors } from './selectors';

export default {
    examinerInfo
};
