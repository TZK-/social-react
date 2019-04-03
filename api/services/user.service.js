const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("../config");

async function getAll() {
    return await User.find().select('-password');
}

async function findByCredentials(email, password) {
    const user = await User.findOne({email});
    if (user != null && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        return user;
    }

    throw new Error("Bad credentials");
}

async function getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await User.findById(id).select('-password');
}

async function create(params) {
    if (await User.findOne({email: params.email})) {
        throw new Error(`The email ${params.email} is already taken`);
    }

    const user = new User(params);
    user.password = bcrypt.hashSync(user.password);

    return user.save();
}

async function getJWT(email, password) {
    await findByCredentials(email, password);

    return jwt.sign({email}, config.jwt.secret, config.jwt.options);
}

module.exports = {
    getAll,
    getById,
    create,
    findByCredentials,
    getJWT
};
