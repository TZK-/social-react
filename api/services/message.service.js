const Message = require('../models/message.model');

function getMessages(senderId, recipientId) {
    return Message
        .find({
            $or: [
                {author: senderId, recipient: recipientId},
                {author: recipientId, recipient: senderId},
            ]
        })
        .sort('createdAt')
        .populate('author')
        .select('-recipient');
}

function create(senderId, recipientId, content) {
    return new Message({
        author: senderId,
        recipient: recipientId,
        content
    }).save();
}

module.exports.messageService = {
    create,
    getMessages
};
