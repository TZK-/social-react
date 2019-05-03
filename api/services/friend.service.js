const Friend = require('../models/friend.model');
const NotAllowedError = require('../exceptions/NotAllowedError');
const NotExistingError = require('../exceptions/NotExistingError');

async function getFriends(user) {
    const requests = await Friend.find({
        $or: [
            {requester: user._id},
            {recipient: user._id}
        ]
    }).populate('requester', '-friends').populate('recipient', '-friends');

    const friends = requests.map(request => {
        const friend = request.requester._id.equals(user._id)
            ? request.recipient
            : request.requester;

        return {
            _id: request._id,
            accepted: request.accepted,
            friend
        };
    });

    const format = f => ({_id: f._id, friend: f.friend});

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

    return {
        _id: friendRequest._id,
        friend: (await friendRequest.populate('recipient', '-friends').execPopulate()).recipient
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

    return {
        _id: request._id,
        friend: request.populate('requester', '-friends').execPopulate()
    };
}

function deny(requesterId, recipientId) {
    return Friend.find({
        $or: [
            {requester: requesterId, recipient: recipientId},
            {requester: recipientId, recipient: requesterId}
        ]
    }).remove();
}

module.exports.friendService = {
    sendRequest,
    accept,
    deny,
    getFriends
};
