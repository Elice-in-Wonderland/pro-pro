const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const asyncHandler = require('../utils/asyncHandler');
const commentService = require('../services/commentService');

// 댓글 생성
exports.createComment = asyncHandler(async (req, res, next) => {
  const { userId, content, parentType, parentId } = req.body;

  await commentService.createComment({
    userId,
    content,
    parentType,
    parentId,
  });

  return res
    .status(statusCode.CREATED)
    .send(resFormatter.success(responseMessage.COMMENT_CREATED, {}));
});

// 댓글 수정
exports.updateComment = asyncHandler(async (req, res, next) => {
  const { userId, content, parentType, parentId } = req.body;
  const { commentId } = req.params;

  await commentService.updateComment(commentId, {
    userId,
    content,
    parentType,
    parentId,
  });

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.COMMENT_UPDATED, {}));
});

// 댓글 삭제
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;

  await commentService.deleteComment(commentId);

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.COMMENT_DELETED, {}));
});
