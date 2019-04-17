const {forbidden} = require("../helpers");
const {userService} = require("../services/user.service");
const express = require('express');
const {gate} = require('../passport');
const router = express.Router();

async function register(req, res, next) {
    try {
        await userService.create(req.body);
        res.json({})
    } catch (e) {
        next(e);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
}

async function show(req, res, next) {
    try {
        const user = await userService.getById(req.params.id);
        user ? res.json(user) : next();
    } catch (e) {
        next(e);
    }
}

async function edit(req, res, next) {
    if (req.param.id !== req.user.id) {
        next(forbidden());
    }

    try {
        const user = await userService.edit(req.params.id);
        user ? res.json(user) : next();
    } catch (e) {
        next(e);
    }
}

router.post('/users', register);
router.get('/users', gate, getAll);
router.get('/users/:id', gate, show);
router.put('/users/:id', gate, edit);

module.exports = router;
