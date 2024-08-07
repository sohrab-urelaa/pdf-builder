const SOCKET_EVENTS = {
    UPDATE_ACTIVE_STATUS: "UPDATE_ACTIVE_STATUS",
};

class SocketEventHandler {
    socket = null;
    constructor(socket) {
        this.socket = socket;
    }

    handleSocketEvent = () => {
        this.socket.on("signed_data", (data) => {
            io.sockets.emit("signed_data", data);
        });

        // this.socket.on(SOCKET_EVENTS.UPDATE_ACTIVE_STATUS, (data) => {
        //     io.sockets.emit(SOCKET_EVENTS.UPDATE_ACTIVE_STATUS, {
        //         receivers: "all",
        //         userId: data.userId,
        //         online: true,
        //         lastActive: new Date(),
        //     });
        // });
    };
}

module.exports = SocketEventHandler;
