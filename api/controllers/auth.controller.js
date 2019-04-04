const jwt = require("jsonwebtoken");
const {userService} = require("../services/user.service");

const express = require('express');
const router = express.Router();

const auth = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await userService.findByCredentials(email, password);

    if (!user) {
        return res.status(401);
    }

    try {
        const token = await userService.getJWT(user);
        res.status(200).json({token, user});
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
};

router.post('/', auth);

module.exports = router;
