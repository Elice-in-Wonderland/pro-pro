const express = require('express');
const routes = require('../globals/routes.js');

const postController = require('../controllers/postController');

const postRouter = express.Router();

//controller

// 새글 작성 ( 중간에 auth)
postRouter.post(routes.root, postController.createPost);

module.exports = postRouter;
