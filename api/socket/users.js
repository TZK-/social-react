const store = new Map();
const {friendService} = require('../services/friend.service');
const {USER_CONNECTED} = require('../socket/events');

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
    remove(userId);
    store.set(userId, socket);
}

function remove(userId) {
    store.delete(userId);
}

async function emitToFriends(userId, event, data) {
    const friends = await friendService.getFriends(userId);
    friends.accepted.forEach(({friend}) => {
        const socket = getSocketFromUserId(friend._id);
        if (socket) {
            socket.emit(event, data);
        }
    });
}

async function emitLoggedFriends(userId) {
    const friends = await friendService.getFriends(userId);
    const userSocket = getSocketFromUserId(userId);
    if (!userSocket) {
        return;
    }

    friends.accepted.forEach(({friend}) => {
        userSocket.emit(USER_CONNECTED, friend._id);
    });
}

module.exports = {
    getUserIdFromSocket,
    getSocketFromUserId,
    store,
    add,
    remove,
    emitToFriends,
    emitLoggedFriends
};