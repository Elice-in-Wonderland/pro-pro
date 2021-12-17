const express = require('express');
const routes = require('../globals/routes');

const { checkToken } = require('../middlewares/auth.js');
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

// 프로필 정보 가져오기
userRouter.get(routes.root, checkToken, userController.getUser);

// 프로필 정보 수정하기
userRouter.put(routes.root, checkToken, userController.updateUser);

// 유저 닉네임 중복 체크
userRouter.get(routes.userCheckNickname, userController.checkNickname);

module.exports = userRouter;
