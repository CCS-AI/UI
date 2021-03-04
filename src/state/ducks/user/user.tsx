import { userInfo } from '../../../models/entities/user';
import { ModelConfig } from '@rematch/core';
import { localSDK as client } from '../../../sdk';
import RealtimeService from '../../../services/realtime/realtimeService';

export type userStateType = {
    userInfo?: userInfo;
};

export const user: ModelConfig<userStateType> = {
    state: {},
    reducers: {
        setUserInfo(state: userStateType, userInfo: userInfo): userStateType {
            return { ...state, userInfo };
        }
    },
    effects: (dispatch: any) => ({
        async fetchUserInfo() {
            const userInfo = await client.user().fetchUserInfo();

            const { id, status } = userInfo;

            // const socket = RealtimeService.getSocket();

            // socket.on('connect', async () => {
            //     socket.emit('userConnected', { userId: id, status });
            //     socket.on('notification', async () => {});
            // });
            dispatch.user.setUserInfo(userInfo);
        },
        async updateUserPassword({
            currentPassword,
            password,
            passwordConfirm
        }: {
            currentPassword: string;
            password: string;
            passwordConfirm: string;
        }) {
            await client.user().updateUserPassword(currentPassword, password, passwordConfirm);
            return true;
        }
    })
};
