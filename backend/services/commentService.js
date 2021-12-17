const commentModel = require('../models/comment');
const deepCopyObject = require('../utils/deepCopyObject');

exports.createComment = async data => {
  const comment = await commentModel.create(data);

  return comment;
};

exports.updateComment = async (commentId, data) => {
  const comment = await commentModel.findOneAndUpdate(
    { _id: commentId },
    data,
    { new: true },
  );

  return comment;
};

exports.deleteComment = async commentId => {
  const comment = await commentModel.deleteOne({ _id: commentId });

  return comment;
};

exports.getComments = async postId => {
  let comments = await commentModel.find({
    parentType: 'post',
    parentId: postId,
  });

  comments = deepCopyObject(comments);

  // getNestedComments
  await Promise.all(
    comments.map(async comment => {
      comment.nestedComments = await this.getNestedComments(comment._id);
    }),
  );

  return comments;
};

exports.getNestedComments = async commentId => {
  const comments = await commentModel.find({
    parentType: 'comment',
    parentId: commentId,
  });
  return comments;
};
