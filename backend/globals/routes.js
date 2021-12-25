//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER = '/users';
const USER_SIGNIN = '/token';
const USER_EXIST = '/existence/:snsType/:snsId';
const USER_CHECK_NICKNAME = '/check/:nickname';
const BOOKMARK = '/mark';
const AUTH = '/auth';
const KAKAO = '/kakao';
const GOOGLE = '/google';
const CALLBACK = '/callback';

// Post
const POST = '/posts';
const POST_DETAIL = '/:postId';
const RECOMMENDATION = '/recommendation';
const ME = '/me';

// Comment
const COMMENT = '/comments';
const COMMENT_DETAIL = '/:commentId';

const routes = {
  root: ROOT,
  user: USER,
  token: USER_SIGNIN,
  userExist: USER_EXIST,
  userCheckNickname: USER_CHECK_NICKNAME,
  bookmark: BOOKMARK,
  auth: AUTH,
  kakao: KAKAO,
  google: GOOGLE,
  callback: CALLBACK,
  post: POST,
  postDetail: POST_DETAIL,
  recommendation: RECOMMENDATION,
  me: ME,
  comment: COMMENT,
  commentDetail: COMMENT_DETAIL,
};

module.exports = routes;
