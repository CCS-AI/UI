import { RootState } from '../../../state/store/store';
import { createSelector } from 'reselect';

const token = (state: RootState) => state.authentication.token;
const loginError = (state: RootState) => state.error.effects.authentication.loginAsync;

const isAuthentication = createSelector(token, (token) => {
    return !!token;
});

export { default as authenticationSelectors } from './selectors';

export default {
    token,
    isAuthentication,
    loginError
};
