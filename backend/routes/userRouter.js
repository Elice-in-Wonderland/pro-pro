const express = require('express');
const routes = require('../globals/routes');

const userController = require('../controllers/userController.js');

const userRouter = express.Router();

// 카카오 OAuth 서버에 리다이랙트
userRouter.get(routes.auth + routes.kakao, userController.authKakao);

// 카카오 OAuth로부터 각자 리다이랙트되는 주소
userRouter.get(
  routes.auth + routes.kakao + routes.callback,
  userController.callbackKakao,
);

// 구글 OAuth 서버에 리다이랙트
userRouter.get(routes.auth + routes.google, userController.authGoogle);

// 구글 OAuth로부터 각자 리다이랙트되는 주소
userRouter.get(
  routes.auth + routes.google + routes.callback,
  userController.callbackGoogle,
);

// 유저 존재 여부 체크
userRouter.get(routes.userExist, userController.checkSnsId);

// 유저 생성
userRouter.post(routes.root, userController.postUser);

module.exports = userRouter;
