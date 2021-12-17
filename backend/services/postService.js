const postModel = require('../models/post');

// 게시글 생성
exports.createPost = async data => {
  const post = await postModel.create(data);

  return post;
};

// 게시글 수정
exports.updatePost = async (postId, data) => {
  const post = await postModel.findOneAndUpdate({ _id: postId }, data, {
    new: true,
  });

  return post;
};
