import { RootState } from '../../../state/store/store';

const questionnaireInfo = (state: RootState) => state.questionnaire.questionnaireInfo;

export { default as questionnaireSelector } from './selectors';

export default {
    questionnaireInfo
};
