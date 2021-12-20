const commentModel = require('../models/comment');
const userService = require('./userService');

const {
  UnAuthorizedError,
  EntityNotExistError,
} = require('../utils/errors/commonError');

// 댓글 생성
exports.createComment = async data => {
  const comment = await commentModel.create(data);

  return comment;
};

// 댓글 수정
exports.updateComment = async (commentId, data) => {
  try {
    const comment = await commentModel.findOneAndUpdate(
      { _id: commentId },
      data,
      { new: true },
    );
    return comment;
  } catch (err) {
    throw new EntityNotExistError();
  }
};

// 댓글 삭제
exports.deleteComment = async commentId => {
  try {
    const comment = await commentModel.deleteOne({ _id: commentId });

    return comment;
  } catch (err) {
    throw new EntityNotExistError();
  }
};

// 댓글 목록 가져오기
exports.getComments = async postId => {
  let comments = await commentModel
    .find({
      parentType: 'post',
      parentId: postId,
    })
    .lean();

  // getNestedComments
  await Promise.all(
    comments.map(async comment => {
      const author = await userService.checkUser(comment.userId);
      comment.author = author;
      comment.nestedComments = await this.getNestedComments(comment._id);
    }),
  );

  return comments;
};

// 대댓글 목록 가져오기
exports.getNestedComments = async commentId => {
  let comments = await commentModel
    .find({
      parentType: 'comment',
      parentId: commentId,
    })
    .lean();

  await Promise.all(
    comments.map(async comment => {
      const author = await userService.checkUser(comment.userId);
      comment.author = author;
    }),
  );

  return comments;
};

// 댓글 존재 여부
exports.isExistComment = async commentId => {
  try {
    const comment = await commentModel.findOne({
      _id: commentId,
    });
    return comment;
  } catch (err) {
    throw new EntityNotExistError();
  }
};

// 댓글 수정, 삭제 권한확인
exports.authCheck = async (userId, commentId) => {
  const comment = await commentModel.findById(commentId).populate('userId');

  if (comment.userId._id != userId) {
    throw new UnAuthorizedError();
  }

  return comment;
};
