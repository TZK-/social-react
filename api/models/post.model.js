const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', schema);
