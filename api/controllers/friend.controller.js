const express = require('express');
const {gate} = require('../passport');
const router = express.Router();
const {friendService} = require("../services/friend.service");
const {emitLoggedFriends} = require('../socket/users');

async function request(req, res, next) {
    try {
        const request = await friendService.sendRequest(req.user._id, req.params.user);
        res.status(201).json(request);
    } catch (e) {
        next(e);
    }
}

async function accept(req, res, next) {
    try {
        await friendService.accept(req.params.user, req.user._id);
        res.status(204).json({});
    } catch (e) {
        next(e);
    }
}

async function deny(req, res, next) {
    try {
        await friendService.deny(req.params.user, req.user._id);
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
