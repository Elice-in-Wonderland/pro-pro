const postModel = require('../models/post');
const commentService = require('../services/commentService');
const userService = require('../services/userService');
const deepCopyObject = require('../utils/deepCopyObject');

const { UnAuthorizedError } = require('../utils/errors/commonError');

// 북마크된 게시글
exports.getMarkedPost = async postId => {
  let post = await postModel
    .findById(postId)
    .select(
      'category title recruitmentStatus stacks sido capacity marks views createdAt registerDeadline',
    );

  post = deepCopyObject(post);
  post.sido = post.sido || '온라인';
  post.marks = await userService.getBookmarkCount(post._id);

  return post;
};

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

  posts = deepCopyObject(posts);

  posts = await Promise.all(
    posts.map(async post => {
      post.sido = post.sido || '온라인';
      post.marks = await userService.getBookmarkCount(post._id);
      console.log('post', post);
      return post;
    }),
  );

  return posts;
};

// 게시글 상세 페이지
exports.getPostDetail = async postId => {
  let post = await postModel.findById(postId).populate('author');
  const marks = await userService.getBookmarkCount(postId);
  const comments = await commentService.getComments(postId);

  post = deepCopyObject(post);
  post.comments = comments;
  post.marks = marks;

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

exports.increaseView = async postId => {
  const post = postModel.findByIdAndUpdate(postId, { $inc: { views: 1 } });

  return post;
};

// 게시글 수정, 삭제 권한확인
exports.authCheck = async (userId, postId) => {
  const post = await postModel.findById(postId).populate('author');

  if (post.author._id != userId) {
    throw new UnAuthorizedError();
  }
};
