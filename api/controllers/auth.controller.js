const jwt = require("jsonwebtoken");
const {getJWT} = require("../services/user.service");

const express = require('express');
const router = express.Router();

const auth = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const token = await getJWT(email, password);
        res.status(200).json({token});
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
};

router.post('/', auth);

module.exports = router;
