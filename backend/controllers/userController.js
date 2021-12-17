const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const { COOKIE_TOKEN_FEILD } = require('../middlewares/auth');
const jwt = require('../libs/jwt.js');
const asyncHandler = require('../utils/asyncHandler');

const userService = require('../services/userService');
// const logger = require('../utils/logger');

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth';
const KAKAO_AUTH_REDIRECT_URL =
  'http://localhost:4000/users/auth/kakao/callback';
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_REDIRECT_URL =
  'http://localhost:4000/users/auth/google/callback';

// 카카오 OAuth 서버에 리다이랙트
exports.authKakao = (req, res, next) => {
  return res.redirect(
    `${KAKAO_AUTH_URL}/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_AUTH_REDIRECT_URL}&response_type=code`,
  );
};

// 카카오 OAuth로부터 각자 리다이랙트
exports.callbackKakao = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  const { data } = await axios({
    method: 'POST',
    url: `${KAKAO_AUTH_URL}/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_SECRET_ID,
      redirectUri: KAKAO_AUTH_REDIRECT_URL,
      code: code,
    },
  });

  const kakao_access_token = data['access_token'];

  const { data: me } = await axios({
    method: 'GET',
    url: `https://kapi.kakao.com/v2/user/me`,
    headers: {
      authorization: `bearer ${kakao_access_token}`,
    },
  });

  const { id, kakao_account } = me;
  const userInformation = {
    snsId: id,
    snsType: 'kakao',
    imageURL: kakao_account.profile.thumbnail_image_url || '',
  };

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.SUCCESS, userInformation));
});

// 구글 OAuth 서버에 리다이랙트
exports.authGoogle = (req, res, next) => {
  return res.redirect(
    `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`,
  );
};

// 구글 OAuth로부터 각자 리다이랙트
exports.callbackGoogle = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  const { data } = await axios({
    method: 'POST',
    url: `${GOOGLE_AUTH_TOKEN_URL}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_SECRET_ID,
      redirectUri: GOOGLE_AUTH_REDIRECT_URL,
      code: code,
    },
  });

  const access_token = data['access_token'];

  const { data: me } = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
  );

  const { sub, picture } = me;
  const userInformation = {
    snsId: sub,
    snsType: 'google',
    imageURL: picture || '',
  };

  return res
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.SUCCESS, userInformation));
});

// 유저 존재 여부 체크
exports.checkSnsId = asyncHandler(async (req, res, next) => {
  const { snsType, snsId } = req.params;

  const user = await userService.isExistSnsId(snsType, snsId);

  // 존재하지 않는 유저의 경우
  if (!user) {
    return res.status(statusCode.OK).send(
      resFormatter.success(responseMessage.FAIL_SNS_CHECK, {
        snsType,
        snsId,
      }),
    );
  }

  // 이미 존재하는 유저인 경우 토큰 생성
  const jwtResult = await jwt.sign(user);

  const cookieOption = {
    domain: req.hostname,
    // second to milisecond
    expires: new Date(jwtResult.expires * 1000),
  };
  return res
    .cookie(COOKIE_TOKEN_FEILD, jwtResult.accessToken, cookieOption)
    .status(statusCode.OK)
    .send(resFormatter.success(responseMessage.LOGIN_SUCCESS, {}));
});

// 유저 생성
exports.postUser = asyncHandler(async (req, res, next) => {
  // 데이터 전처리
  const { snsType, snsId, nickname, position, stacks, region, imageURL } =
    req.body;
  const { sido, sigungu } = region;

  // 유저 중복체크는 추후에 결정

  const user = await userService.snsSignUp({
    snsType,
    snsId,
    nickname,
    position,
    stacks,
    sido,
    sigungu,
    imageURL,
  });

  const jwtResult = await jwt.sign(user);

  const cookieOption = {
    domain: req.hostname,
    // second to milisecond
    expires: new Date(jwtResult.expires * 1000),
  };

  return res
    .cookie(COOKIE_TOKEN_FEILD, jwtResult.accessToken, cookieOption)
    .status(statusCode.CREATED)
    .send(resFormatter.success(responseMessage.CREATED_USER, {}));
});
