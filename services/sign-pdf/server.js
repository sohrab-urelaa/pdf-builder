const express = require("express");
const routes = require("./src/routes/route");
const { createServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const SocketEventHandler = require("./src/controller/socketController");
const cors = require("cors");
const app = express();
const server = createServer(app);

app.use(cors());

io = new SocketServer(server);
io.on("connection", (socket) => {
    console.log("New User Connected");
    const socketEvent = new SocketEventHandler(socket);
    socketEvent.handleSocketEvent();
});

global.socketIo = io;

app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
