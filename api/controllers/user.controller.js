const {forbidden, validate} = require("../helpers");
const {userService} = require("../services/user.service");
const express = require('express');
const {gate} = require('../passport');
const router = express.Router();
const {check} = require('express-validator/check');

function register(req, res, next) {
    validate(req)
        .then(() => userService.create(req.body))
        .then(() => res.status(201).send({}))
        .catch(e => next(e));
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
    if (req.params.id !== req.user.id) {
        next(forbidden());
    }
    
    try {
        const user = await userService.edit(req.params.id, req.body);
        user ? res.json(user) : next();
    } catch (e) {
        next(e);
    }
}

const userValidation = [
    check('email')
        .not().isEmpty().withMessage('Cannot be empty')
        .isEmail().withMessage('Not a valid email'),

    check('first_name')
        .not().isEmpty().withMessage('Cannot be empty')
        .isAlpha().withMessage('Not a valid string'),

    check('last_name')
        .not().isEmpty().withMessage('Cannot be empty')
        .isAlpha().withMessage('Not a valid string'),

    check('password')
        .not().isEmpty().withMessage('Cannot be empty')
        .isLength({min: 5}).withMessage('Must be at least 5 characters'),

    check('password_confirmation')
        .not().isEmpty().withMessage('Cannot be empty')
];

router.post('/users', userValidation, register);
router.get('/users', gate, getAll);
router.get('/users/:id', gate, show);
router.put('/users/:id', gate, edit);

module.exports = router;
