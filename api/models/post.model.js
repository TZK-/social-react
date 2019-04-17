const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', schema);
