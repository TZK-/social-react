const {DISCONNECTED, SOCKET_OPENED, USER_CONNECTED} = require('./events');
const {add, remove, getUserIdFromSocket, store} = require('./users');

const listeners = (io) => {
    io.on(SOCKET_OPENED, (socket) => {
        socket.on(DISCONNECTED, () => {
            const userId = getUserIdFromSocket(socket);

            console.log("[Socket unbound]: " + userId);
            remove(userId);
            io.emit(DISCONNECTED, userId);
        });

        socket.on(USER_CONNECTED, userId => {
            console.log("[Socket bound]: " + userId);
            add(userId, socket);

            // Notify all user someone connected
            store.forEach((socket, userId) => {
                socket.broadcast.emit(USER_CONNECTED, userId);
            });
        });
    });
};

module.exports = listeners;