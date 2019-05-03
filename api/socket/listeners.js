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
            io.emit(DISCONNECTED, getUser(socket));
        });

        socket.on(USER_CONNECTED, userId => {
            console.log("LOGGED : " + userId + "\n");
            sockets.set(userId, socket);
            io.emit(USER_CONNECTED, userId);
        });
    });
};

module.exports = listeners;