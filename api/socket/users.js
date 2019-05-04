const store = new Map();
const {friendService} = require('../services/friend.service');

function getUserIdFromSocket(socket) {
    for (const [id, sock] of store) {
        if (socket === sock) {
            return id;
        }
    }

    return null;
}

function getSocketFromUserId(userId) {
    for (const [id, sock] of store) {
        if (userId.equals(id)) {
            return sock;
        }
    }

    return null;
}

function add(userId, socket) {
    store.set(userId, socket);
}

function remove(userId) {
    store.delete(userId);
}

async function emitToFriends(user, event, data) {
    const friends = await friendService.getFriends(user);
    friends.accepted.forEach(({friend}) => {
        const socket = getSocketFromUserId(friend._id);
        if (socket) {
            console.log("FRIENDS EMIT: " + friend._id);
            socket.emit(event, data);
        }
    });
}

module.exports = {
    getUserIdFromSocket,
    getSocketFromUserId,
    store,
    add,
    remove,
    emitToFriends
};