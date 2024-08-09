import io from "socket.io-client";
const socket = io("http://192.168.0.103:5001", {
    reconnectionDelay: 1000,
    reconnection: true,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    reconnectionAttempts: 3,
});

export default socket;
