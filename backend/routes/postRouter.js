const express = require('express');
const routes = require('../globals/routes.js');

const postController = require('../controllers/postController');

const postRouter = express.Router();

// Auth 적용 전

// 게시글 목록
postRouter.get(routes.root, postController.getPost);
// 게시글 생성
postRouter.post(routes.root, postController.createPost);
// 게시글 수정
postRouter.put(routes.postDetail, postController.updatePost);
// 게시글 삭제
postRouter.delete(routes.postDetail, postController.deletePost);

module.exports = postRouter;
