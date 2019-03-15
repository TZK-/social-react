const express = require('express');
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

router.post('/', register);
router.get('/', getAll);
router.get('/:id', show);

module.exports = router;
