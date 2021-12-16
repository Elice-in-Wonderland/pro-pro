const express = require('express');
const routes = require('../globals/routes.js');

const commentController = require('../controllers/commentController');

const commentRouter = express.Router();

//controller

// 새글 작성 ( 중간에 auth)
commentRouter.post(routes.root, commentController.createComment);

module.exports = commentRouter;
