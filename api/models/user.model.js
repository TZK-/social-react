const mongoose = require('mongoose');
const gravatar = require('gravatar');

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    }]
}, {timestamps: true});

schema.pre('init', user => {
    user.avatar = gravatar.url(user.email, {protocol: 'https', s: 256, d: 'retro'});
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);
