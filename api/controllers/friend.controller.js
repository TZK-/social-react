const express = require('express');
const {gate} = require('../passport');
const router = express.Router();
const {friendService} = require("../services/friend.service");

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
        await friendService.accept(req.params.id, req.user._id);
        res.status(204).json({});
    } catch (e) {
        next(e);
    }
}

async function deny(req, res, next) {
    try {
        await friendService.deny(req.params.id, req.user._id);
        res.status(204).json({});
    } catch (e) {
        next(e);
    }
}

router.post('/users/:user/friends', gate, request);
router.post('/friends/:id/accept', gate, accept);
router.post('/friends/:id/deny', gate, deny);

module.exports = router;
