const postModel = require('../models/post');
const commentService = require('../services/commentService');
const userService = require('../services/userService');

const {
  UnAuthorizedError,
  EntityNotExistError,
} = require('../utils/errors/commonError');

// 북마크된 게시글
exports.getMarkedPost = async postId => {
  let post = await postModel
    .findById(postId)
    .select(
      'category title recruitmentStatus stacks sido capacity marks views createdAt registerDeadline',
    )
    .lean();

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
    )
    .lean();

  if (posts.length !== 0) {
    posts = await Promise.all(
      posts.map(async post => {
        post.sido = post.sido || '온라인';
        post.marks = await userService.getBookmarkCount(post._id);
        return post;
      }),
    );
  }

  return posts;
};

// 게시글 상세 페이지
exports.getPostDetail = async postId => {
  const post = await postModel.findById(postId).populate('author').lean();
  const marks = await userService.getBookmarkCount(postId);
  const comments = await commentService.getComments(postId);

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

// 조회수 증가
exports.increaseView = async postId => {
  const post = postModel.findByIdAndUpdate(postId, { $inc: { views: 1 } });

  return post;
};

// 게시글 수정, 삭제 권한확인
exports.authCheck = async (userId, postId) => {
  const post = await postModel.findById(postId).populate('author');

  if (!post.author._id.equals(userId)) {
    throw new UnAuthorizedError();
  }

  return post;
};

// 게시글 존재 여부
exports.isExistPost = async postId => {
  try {
    const post = await postModel.findOne({
      _id: postId,
    });

    return post;
  } catch (err) {
    throw new EntityNotExistError();
  }
};
