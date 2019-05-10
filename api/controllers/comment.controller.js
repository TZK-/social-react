const {commentService} = require("../services/comment.service");
const express = require('express');
const router = express.Router();
const {gate} = require('../passport');
const {validate} = require('../helpers');
const {check} = require('express-validator/check');

async function create(req, res, next) {
    validate(req)
        .then(() => commentService.create(req.params.id, req.user._id, req.body.content))
        .then(comment => res.status(201).json(comment))
        .catch(e => next(e));
}

router.post('/posts/:id/comment', [
    check('content').not().isEmpty().withMessage('Field cannot be empty')
], gate, create);

module.exports = router;
