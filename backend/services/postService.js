const postModel = require('../models/post');
const commentService = require('../services/commentService');
const deepCopyObject = require('../utils/deepCopyObject');

// 게시글 목록
exports.getPost = async (category, skipSize, perPage) => {
  let posts = await postModel
    .find({ category })
    .sort({ createdAt: -1 })
    .skip(skipSize)
    .limit(perPage)
    .select(
      'category title recruitmentStatus stacks sido capacity marks views createdAt registerDeadline',
    );

  posts = posts.map(post => {
    post.sido = post.sido || '온라인';
    return post;
  });

  return posts;
};

// 게시글 상세 페이지
exports.getPostDetail = async postId => {
  let post = await postModel.findOne({ _id: postId });
  const comments = await commentService.getComments(postId);

  post = deepCopyObject(post);
  post.comments = comments;

  return post;
};

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

// 게시글 삭제
exports.deletePost = async postId => {
  const post = await postModel.deleteOne({ _id: postId });

  return post;
};
