const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("../config");

async function getAll() {
    return await User.find().select();
}

async function findByCredentials(email, password) {
    const user = await User.findOne({email}).select('+password');
    if (user != null && bcrypt.compareSync(password, user.password)) {
        // TODO be sure it remove the password
        delete user.password;
        return user;
    }

    return null;
}

async function getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return User.findById(id).select();
}

async function create(params) {
    if (await User.findOne({email: params.email})) {
        throw new Error(`The email ${params.email} is already taken`);
    }

    const user = new User(params);
    user.password = bcrypt.hashSync(user.password);

    await user.save();
    return user;
}

async function edit(user, data) {
    for (const [key, value] of Object.entries(data)) {
        if (user[key]) {
            user[key] = value;
        }
    }

    await user.save();

    return user;
}

function getJWT(user) {
    return jwt.sign(
        {id: user.id},
        config.jwt.secret,
        config.jwt.options || {}
    );
}

module.exports.userService = {
    getAll,
    getById,
    create,
    getJWT,
    findByCredentials,
    edit
};
