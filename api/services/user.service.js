const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const mongoose = require('mongoose');

async function getAll() {
    return await User.find().select('-password');
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

module.exports = {
    getAll,
    getById,
    create
};
