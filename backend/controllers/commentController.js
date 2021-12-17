const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const asyncHandler = require('../utils/asyncHandler');
const commentService = require('../services/commentService');

exports.createComment = asyncHandler(async (req, res, next) => {
  const { content, parentType, parentId } = req.body;

  await commentService.createComment({
    content,
    parentType,
    parentId,
  });

  return res
    .status(statusCode.CREATED)
    .send(resFormatter.success(responseMessage.COMMENT_CREATED, {}));
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const { content, parentType, parentId } = req.body;

  const { commentId } = req.params;

  await commentService.updateComment(commentId, {
    content,
    parentType,
    parentId,
  });

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.COMMENT_UPDATED, {}));
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;

  await commentService.deleteComment(commentId);

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.COMMENT_DELETED, {}));
});
