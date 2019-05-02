const Post = require('../models/post.model');

async function getAll(userId) {
    return await Post.find({}).sort('-created_at')
        .populate('author')
        .select();
}

async function create(user, data) {
    const post = new Post(data);
    post.author = user._id;
    await post.save();

    return post.populate('author').execPopulate();
}

module.exports.postService = {
    getAll,
    create
};
