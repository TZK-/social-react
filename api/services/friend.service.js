const Friend = require('../models/friend.model');
const NotAllowedError = require('../exceptions/NotAllowedError');
const NotExistingError = require('../exceptions/NotExistingError');

async function sendRequest(requesterId, recipientId) {
    if (requesterId === recipientId) {
        throw new NotAllowedError('You cannot request yourself as a friend');
    }

    const request = await Friend.findOne({
        $or: [
            {$and: [{requester: requesterId}, {recipient: recipientId}]},
            {$and: [{requester: recipientId}, {recipient: requesterId}]},
        ]
    });

    if (request) {
        if (request.accept) {
            throw new NotAllowedError('You are already friends');
        }

        throw new NotAllowedError('A friend request is already pending');
    }

    const friendRequest = new Friend();
    friendRequest.requester = requesterId;
    friendRequest.recipient = recipientId;
    friendRequest.accepted = false;

    await friendRequest.save();

    return friendRequest
        .populate('requester', '-friends')
        .populate('recipient', '-friends')
        .execPopulate();
}

async function accept(requestId, recipientId) {
    const request = await Friend.findOne({_id: requestId, accepted: false});

    if (!request) {
        throw new NotExistingError("No friend request found");
    }

    if (!request.recipient.equals(recipientId)) {
        throw new NotAllowedError("You can not accept a request if it is not intended for you");
    }

    request.accepted = true;
    return request.save();
}

function deny(requestId, recipientId) {
    // TODO check if user has right to handle request
    return Friend.findOneAndDelete({_id: requestId});
}

module.exports.friendService = {
    sendRequest,
    accept,
    deny
};
