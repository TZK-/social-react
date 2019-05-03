const {DISCONNECTED, SOCKET_OPENED, USER_CONNECTED} = require('./events');

const sockets = new Map();

function getUser(socket) {
    for (const [id, sock] of sockets) {
        if (socket === sock) {
            return id;
        }
    }

    return null;
}

const listeners = (io) => {
    io.on(SOCKET_OPENED, (socket) => {
        socket.on(DISCONNECTED, function () {
            const userId = getUser(socket);

            console.log("[Socket bound]: " + userId);
            io.emit(DISCONNECTED, userId);
        });

        socket.on(USER_CONNECTED, userId => {
            console.log("[Socket bound]: " + userId);
            sockets.set(userId, socket);

            // Notify all user someone connected
            sockets.forEach((socket, userId) => {
                io.emit(USER_CONNECTED, userId);
            });
        });
    });
};

module.exports = listeners;