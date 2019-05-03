const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamp: true});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Message', schema);
