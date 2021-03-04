import SideEffectJS from 'side-effect-js';
import { fetchUserSideEffect } from './user/fetchUserSideEffect';

const InitializeSideEffects = () => {
    //When needed new side effect - just add it to this array and it will be registered
    const sideEffects = [fetchUserSideEffect];
    SideEffectJS.Load(sideEffects);
};

export default InitializeSideEffects;
