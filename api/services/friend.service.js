const Friend = require('../models/friend.model');
const NotAllowedError = require('../exceptions/NotAllowedError');
const NotExistingError = require('../exceptions/NotExistingError');

async function getFriends(userId) {
    const requests = await Friend.find({
        $or: [
            {requester: userId},
            {recipient: userId}
        ]
    }).populate('requester', '-friends').populate('recipient', '-friends');

    const friends = requests.map(request => {
        const friend = request.requester._id.equals(userId)
            ? request.recipient
            : request.requester;

        return {
            _id: request._id,
            accepted: request.accepted,
            friend: {
                ...friend.toJSON(),
                isRequester: request.requester._id === friend._id
            },
        };
    });

    const format = f => ({_id: f._id, friend: f.friend, requester: f.requester});

    return {
        accepted: friends.filter(f => f.accepted).map(format),
        pending: friends.filter(f => !f.accepted).map(format),
    }
}

async function sendRequest(requesterId, recipientId) {
    if (requesterId.equals(recipientId)) {
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

    const populatedRequest = await friendRequest
        .populate('recipient', '-friends')
        .populate('requester', '-friends')
        .execPopulate();

    return {
        _id: friendRequest._id,
        friend: populatedRequest.recipient,
        requester: populatedRequest.requester
    };
}

async function accept(requesterId, recipientId) {
    const request = await Friend.findOne({
        requester: requesterId,
        recipient: recipientId,
        accepted: false
    });

    if (!request) {
        throw new NotExistingError("No friend request found");
    }

    if (!request.recipient.equals(recipientId)) {
        throw new NotAllowedError("You can not accept a request if it is not intended for you");
    }

    request.accepted = true;
    await request.save();

    const populatedRequest = await request
        .populate('requester', '-friends')
        .populate('recipient', '-friends')
        .execPopulate();

    return {
        _id: request._id,
        requester: populatedRequest.requester,
        recipient: populatedRequest.recipient,
    };
}

function deny(requesterId, recipientId) {
   return Friend.findOneAndRemove({
        $or: [
            {requester: requesterId, recipient: recipientId},
            {requester: recipientId, recipient: requesterId}
        ]
    });
}

module.exports.friendService = {
    sendRequest,
    accept,
    deny,
    getFriends
};
