const {postService} = require("../services/post.service");
const express = require('express');
const router = express.Router();
const {gate} = require('../passport');
const {unprocessable} = require('../helpers');

async function create(req, res, next) {
    if (!req.body.content) {
        unprocessable("The content is required");
    }

    const post = await postService.create(req.user, req.body);

    res.json(post);
}

async function getAllForUser(req, res, next) {
    try {
        const posts = await postService.getAll(req.params.id);
        res.json(posts);
    } catch (e) {
        next(e);
    }
}

router.get('/users/:id/posts', gate, getAllForUser);
router.post('/posts', gate, create);

module.exports = router;
