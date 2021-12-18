const express = require('express');
const routes = require('../globals/routes.js');

const commentController = require('../controllers/commentController');

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post(routes.root, commentController.createComment);

// 댓글 수정
commentRouter.put(routes.commentDetail, commentController.updateComment);

// 댓글 삭제
commentRouter.delete(routes.commentDetail, commentController.deleteComment);

module.exports = commentRouter;
