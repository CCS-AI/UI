import SideEffectJS from 'side-effect-js';
import mockData from './mockData';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchUserMenuMock = async () => {
    return Promise.resolve(mockData);
};
const fetchUserMenuApi = () => Promise.reject('Implement API');

export const fetchUserSideEffect = SideEffectJS.CreateEffect('fetchUserMenu', fetchUserMenuApi, fetchUserMenuMock);
