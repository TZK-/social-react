const jwt = require("jsonwebtoken");
const {userService} = require("../services/user.service");
const {unauthenticated, unprocessable} = require("../helpers");

const express = require('express');
const router = express.Router();

const auth = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await userService.findByCredentials(email, password);

    if (!user) {
        return next(unprocessable("Bad credentials"));
    }

    const token = userService.getJWT(user);
    res.status(200).json({token, user});
};

router.post('/auth', auth);

module.exports = router;
