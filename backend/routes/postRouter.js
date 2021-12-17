const express = require('express');
const routes = require('../globals/routes.js');

const postController = require('../controllers/postController');

const postRouter = express.Router();

// Auth 적용 전

// 새 글 작성
postRouter.post(routes.root, postController.createPost);

// 게시글 수정
postRouter.put(routes.postDetail, postController.updatePost);

module.exports = postRouter;
