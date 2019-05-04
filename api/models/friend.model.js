const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accepted: {
        type: Boolean
    }
}, {timestamps: true});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Friend', schema);
