const express = require('express');
const routes = require('../globals/routes.js');

const commentController = require('../controllers/commentController');

const commentRouter = express.Router();

//controller

commentRouter.post(routes.root, commentController.createComment);

commentRouter.put(routes.commentDetail, commentController.updateComment);

commentRouter.delete(routes.commentDetail, commentController.deleteComment);

module.exports = commentRouter;
