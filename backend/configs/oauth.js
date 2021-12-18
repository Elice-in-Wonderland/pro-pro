const dotenv = require('dotenv');

dotenv.config();

// 베이스
const BASE_URL = `http://localhost:4000`;

// 카카오
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth`;
const KAKAO_AUTH_REDIRECT_URL = `${BASE_URL}/users/auth/kakao/callback`;
const KAKAO_SERVER_URL = `${KAKAO_AUTH_URL}/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_AUTH_REDIRECT_URL}&response_type=code`;
const KAKAO_TOKEN_URL = `${KAKAO_AUTH_URL}/token`;
const KAKAO_ACCESS_URL = `https://kapi.kakao.com/v2/user/me`;

// 구글
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth`;
const GOOGLE_AUTH_TOKEN_URL = `https://oauth2.googleapis.com/token`;
const GOOGLE_AUTH_REDIRECT_URL = `${BASE_URL}/users/auth/google/callback`;
const GOOGLE_SERVER_URL = `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`;
const GOOGLE_ACCESS_URL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token`;

module.exports = {
  KAKAO_AUTH_URL,
  KAKAO_AUTH_REDIRECT_URL,
  KAKAO_SERVER_URL,
  KAKAO_TOKEN_URL,
  KAKAO_ACCESS_URL,
  GOOGLE_AUTH_URL,
  GOOGLE_AUTH_TOKEN_URL,
  GOOGLE_AUTH_REDIRECT_URL,
  GOOGLE_SERVER_URL,
  GOOGLE_ACCESS_URL,
};
