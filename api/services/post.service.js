const Post = require('../models/post.model');
const Friend = require('../models/friend.model');

async function getAll(userId) {
    return await Post.find({author: userId}).sort('-createdAt')
        .populate('author')
        .select();
}

async function getFeed(userId) {
    const requests = await Friend.find({
        $or: [
            {requester: userId},
            {recipient: userId}
        ],
        accepted: true
    });

    const authorIdx = requests
        .map(r => r.requester._id)
        .concat(requests.map(r => r.recipient._id));

    return await Post.find({
        $or: [
            {author: userId},
            {
                author: {
                    $in: authorIdx
                }
            }
        ]
    }).populate('author').sort('-createdAt');
}

async function create(user, data) {
    const post = new Post(data);
    post.author = user._id;
    await post.save();

    return await post.populate('author').execPopulate();
}

module.exports.postService = {
    getAll,
    getFeed,
    create
};
