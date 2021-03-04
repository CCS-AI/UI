import socketIOClient from 'socket.io-client';

export default class RealtimeService {
    static socket: SocketIOClient.Socket;

    static getSocket() {
        if (!RealtimeService.socket) {
            RealtimeService.socket = socketIOClient(`${process.env.REACT_APP_API_URL}`, {
                transports: ['websocket']
            });
        }

        return this.socket;
    }
}
