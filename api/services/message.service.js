const Message = require('../models/message.model');
const socket = require('../socket/index');

function write(authorId, recipientId, content) {
    const message = new Message({
        author: authorId,
        recipient: recipientId,
        content
    });

    
}

module.exports.friendService = {
    write
};
