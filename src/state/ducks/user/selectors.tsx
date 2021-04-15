import { RootState } from '../../../state/store/store';
import { permissionFromString } from '../../../sdk/guards/UserGuard';

const userInfo = (state: RootState) => state.user.userInfo;

const userRole = (state: RootState) => {
    const role = state.user.userInfo ? state.user.userInfo.role : 'UNDEFINED';
    return permissionFromString(role);
};

export { default as userSelectors } from './selectors';

export default {
    userInfo,
    userRole
};
