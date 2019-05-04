const express = require('express');
const {gate} = require('../passport');
const router = express.Router();
const {friendService} = require("../services/friend.service");
const {emitLoggedFriends, getSocketFromUserId} = require('../socket/users');
const {FRIEND_REQUEST, FRIEND_ACCEPTED, FRIEND_DENIED} = require('../socket/events');

async function request(req, res, next) {
    try {
        const request = await friendService.sendRequest(req.user._id, req.params.user);
        const socket = getSocketFromUserId(req.params.user);
        if (socket) {
            socket.emit(FRIEND_REQUEST, request);
        }

        res.status(201).json(request);
    } catch (e) {
        next(e);
    }
}

async function accept(req, res, next) {
    try {
        const request = await friendService.accept(req.params.user, req.user._id);
        const socket = getSocketFromUserId(req.params.user);
        if (socket) {
            socket.emit(FRIEND_ACCEPTED, request);
            emitLoggedFriends(req.user._id);
            emitLoggedFriends(req.params.user);
        }

        res.status(204).json({});
    } catch (e) {
        next(e);
    }
}

async function deny(req, res, next) {
    try {
        const request = await friendService.deny(req.params.user, req.user._id);
        const socketRequester = getSocketFromUserId(req.params.user);
        if (socketRequester) {
            socketRequester.emit(FRIEND_DENIED, request);
        }

        const socketRecipient = getSocketFromUserId(req.user._id);
        if (socketRecipient) {
            socketRequester.emit(FRIEND_DENIED, request);
        }

        res.status(204).json({});
    } catch (e) {
        next(e);
    }
}

async function getAll(req, res, next) {
    try {
        const friends = await friendService.getFriends(req.user._id);
        emitLoggedFriends(req.user._id);

        res.status(200).json(friends);
    } catch (e) {
        next(e);
    }
}

router.get('/user/friends', gate, getAll);

router.post('/friends/:user', gate, request);
router.post('/friends/:user/accept', gate, accept);
router.post('/friends/:user/deny', gate, deny);

module.exports = router;
