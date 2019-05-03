const {postService} = require("../services/post.service");
const express = require('express');
const router = express.Router();
const {gate} = require('../passport');
const {validate} = require('../helpers');
const {check} = require('express-validator/check');

async function create(req, res, next) {
    validate(req)
        .then(() => postService.create(req.user, req.body))
        .then(post => res.status(201).json(post))
        .catch(e => next(e));
}

async function getAllForUser(req, res, next) {
    try {
        const posts = await postService.getAll(req.params.id);
        res.json(posts);
    } catch (e) {
        next(e);
    }
}

async function getFeed(req, res, next) {
    try {
        const posts = await postService.getFeed(req.params.id);
        res.json(posts);
    } catch (e) {
        next(e);
    }
}

router.get('/users/:id/feed', gate, getFeed);
router.get('/users/:id/posts', gate, getAllForUser);
router.post('/posts', [
    check('content').not().isEmpty().withMessage('Field cannot be empty')
], gate, create);

module.exports = router;
