import { RootState } from '../../../state/store/store';

const userInfo = (state: RootState) => state.user.userInfo;

export { default as userSelectors } from './selectors';

export default {
    userInfo
};
