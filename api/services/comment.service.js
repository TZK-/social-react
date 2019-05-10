const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

async function create(postId, authorId, content) {
    const comment = await new Comment({
        author: authorId,
        content
    }).save();

    await Post.findOneAndUpdate({
        _id: postId
    }, {
        $push: {comments: comment._id}
    });

    return comment
        .populate('author')
        .execPopulate();
}

module.exports.commentService = {
    create,
};
