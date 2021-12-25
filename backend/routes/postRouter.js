const express = require('express');
const routes = require('../globals/routes.js');

const { checkToken, isExistToken } = require('../middlewares/auth.js');
const postController = require('../controllers/postController');

const postRouter = express.Router();

// Auth 적용 전

// 게시글 목록
postRouter.get(routes.root, postController.getPost);

// 게시글 상세페이지
postRouter.get(routes.postDetail, isExistToken, postController.getPostDetail);

// 게시글 생성
postRouter.post(routes.root, checkToken, postController.createPost);

// 게시글 수정
postRouter.put(routes.postDetail, checkToken, postController.updatePost);

// 게시글 삭제
postRouter.delete(routes.postDetail, checkToken, postController.deletePost);

module.exports = postRouter;
