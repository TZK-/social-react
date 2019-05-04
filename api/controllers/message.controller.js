const express = require('express');
const router = express.Router();
const {gate} = require('../passport');
const {check} = require('express-validator/check');
const {messageService} = require('../services/message.service');

async function getAll(req, res, next) {
    try {
        const messages = await messageService.getMessages(req.user._id, req.params.recipient);
        res.status(200).json(messages);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const message = await messageService.create(
            req.user._id,
            req.params.recipient,
            req.body.content
        );

        res.status(201).json(message);
    } catch (e) {
        next(e);
    }
}

router.get('/messages/:recipient', gate, getAll);

router.post('/messages/:recipient', [
    check('content').not().isEmpty().withMessage('Field cannot be empty')
], gate, create);

module.exports = router;
