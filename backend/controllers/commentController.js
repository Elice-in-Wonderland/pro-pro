const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const asyncHandler = require('../utils/asyncHandler');
const commentService = require('../services/commentService');
const postService = require('../services/postService');
const {
  ValidationError,
  EntityNotExistError,
} = require('../utils/errors/commonError');
const { ParentTypeError } = require('../utils/errors/commentError');

// 댓글 생성
exports.createComment = asyncHandler(async (req, res, next) => {
  const { content, parentType, parentId } = req.body;
  const { userId } = req.decoded;

  // 입력값 확인
  if (!userId || !content || !parentType || !parentId)
    throw new ValidationError();

  // parentType의 값이 post나 comment 이외의 것들일 경우
  if (parentType !== 'post' && parentType !== 'comment')
    throw new ParentTypeError();

  // parentType에 해당하는 parentId 정보가 존재하지 않는 경우
  let parent;
  if (parentType === 'post') {
    parent = await postService.isExistPost(parentId);
  } else {
    parent = await commentService.isExistComment(parentId);
  }

  if (!parent) throw new EntityNotExistError();

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
  const { content, parentType, parentId } = req.body;
  const { commentId } = req.params;
  const { userId } = req.decoded;

  // 입력값 확인
  if (!userId || !content || !parentType || !parentId)
    throw new ValidationError();

  // parentType의 값이 post나 comment 이외의 것들일 경우
  if (parentType !== 'post' && parentType !== 'comment')
    throw new ParentTypeError();

  // parentType에 해당하는 parentId 정보가 존재하지 않는 경우
  let parent;
  if (parentType === 'post') {
    parent = await postService.isExistPost(parentId);
  } else {
    parent = await commentService.isExistComment(parentId);
  }
  if (!parent) throw new EntityNotExistError();

  // 해당 comment가 존재하지 않을 때
  await commentService.isExistComment(commentId);

  // 수정 권한 확인
  await commentService.authCheck(userId, commentId);

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
  const { userId } = req.decoded;

  // 해당 comment가 존재하지 않을 때
  await commentService.isExistComment(commentId);

  // 수정 권한 확인
  await commentService.authCheck(userId, commentId);

  await commentService.deleteComment(commentId);

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.COMMENT_DELETED, {}));
});
