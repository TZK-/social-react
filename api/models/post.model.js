const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Post', schema);
