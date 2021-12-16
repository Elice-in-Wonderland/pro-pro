const commentModel = require('../models/comment');

exports.createComment = async data => {
  const comment = await commentModel.create(data);

  return comment;
};
