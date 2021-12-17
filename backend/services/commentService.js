const commentModel = require('../models/comment');

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
  console.log(comment);
  return comment;
};

exports.deleteComment = async commentId => {
  const comment = await commentModel.deleteOne({ _id: commentId });

  return comment;
};
