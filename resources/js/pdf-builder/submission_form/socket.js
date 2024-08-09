import io from "socket.io-client";
const socket = io(import.meta.env.VITE_NODE_SERVER_API_URL, {
    reconnectionDelay: 1000,
    reconnection: true,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    reconnectionAttempts: 3,
});

export default socket;
