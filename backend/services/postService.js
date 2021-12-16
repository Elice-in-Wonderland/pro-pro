const postModel = require('../models/post');

exports.createPost = async data => {
  const post = await postModel.create(data);

  return post;
};
