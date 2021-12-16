//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER = '/users';
const USER_SIGNIN = '/token';
const USER_CHECK_NICKNAME = '/check/:nickname';
const BOOKMARK = '/mark';
const BOOKMARK_DETAIL = '/:postId';

// Post
const POST = '/posts';
const POST_DETAIL = '/:postId';

// Comment
const COMMENT = '/comments';
const COMMENT_DETAIL = '/:commentId';

const routes = {
  root: ROOT,
  user: USER,
  token: USER_SIGNIN,
  userCheckNickname: USER_CHECK_NICKNAME,
  bookmark: BOOKMARK,
  bookmarkDetail: BOOKMARK_DETAIL,
  post: POST,
  postDetail: POST_DETAIL,
  comment: COMMENT,
  commentDetail: COMMENT_DETAIL,
};

module.exports = routes;
