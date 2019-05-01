const mongoose = require('mongoose');

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
}, {timestamp: true});

schema.pre('init', (user) => {
    user.avatar = 'https://picsum.photos/200';
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', schema);
