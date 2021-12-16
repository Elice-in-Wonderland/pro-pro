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
