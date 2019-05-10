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
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {timestamps: true});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Comment', schema);
