const express = require('express');
const passport = require('passport');
const userService = require('../services/user.service');
const router = express.Router();

const register = async (req, res, next) => {
    try {
        await userService.create(req.body);
        res.json({})
    } catch (e) {
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
};

const show = async (req, res, next) => {
    try {
        const user = await userService.getById(req.params.id);
        user ? res.json(user) : next();
    } catch (e) {
        next(e);
    }
};

const authGate = passport.authenticate('jwt', {session: false});
router.post('/', register);
router.get('/', authGate, getAll);
router.get('/:id', authGate, show);

module.exports = router;
