//응답 메시지 모음

module.exports = {
  SUCCESS: 'Request 성공',
  NULL_VALUE: '필요한 값이 없거나 잘못되었습니다.',
  OUT_OF_VALUE: '파라미터 값이 잘못되었습니다.',
  WRONG_INDEX: '잘못된 인덱스 접근입니다.',
  DB_ERROR: 'DB 오류',
  INTERNAL_SERVER_ERROR: '서버 오류입니다.',
  DUPLICATE_ERROR: '중복된 요청입니다.',
  PERMISSION_ERROR: '권한이 없습니다.',
  ENTITY_NOT_EXIST: 'DB에 없는 데이터 관련 요청입니다.',
  NO_PAGE_ERROR: '해당 라우트는 존재하지 않습니다.',

  // token
  EMPTY_TOKEN: '토큰 값이 없습니다.',
  EXPIRED_TOKEN: '토큰 값이 만료되었습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰값입니다.',
  AUTH_SUCCESS: '인증에 성공했습니다.',
  ISSUE_SUCCESS: '새로운 토큰이 생성되었습니다.',

  // 회원가입
  CREATED_USER: '회원 가입 성공',
  AVAILABLE_NICKNAME: '사용 가능한 닉네임입니다.',
  DUPLICATE_NICKNAME: '이미 사용 중인 닉네임입니다',
  SUCCESS_SNS_CHECK: '가입되어 있는 계정입니다.',
  FAIL_SNS_CHECK: '가입되어 있지 않은 계정입니다.',
  //FAIL_SINGUP: '회원 가입 실패',

  // 로그인
  LOGIN_SUCCESS: '로그인 성공',
  //LOGIN_FAIL: '로그인 실패',
  LOGOUT_SUCCESS: '로그아웃 성공',
  NO_USER: '존재하지 않는 회원입니다.',

  // user
  USER_UPDATED: '프로필 정보 수정 성공',
  CREATE_BOOKMARK_SUCCESS: '북마크 추가 성공',
  DELETE_BOOKMARK_SUCCESS: '북마크 삭제 성공',

  // post
  POST_CREATED: '게시글 생성 성공',
  POST_UPDATED: '게시글 수정 성공',
  POST_DELETED: '게시글 삭제 성공',

  // comment
  COMMENT_CREATED: '댓글 생성 성공',
  COMMENT_UPDATED: '댓글 수정 성공',
  COMMENT_DELETED: '댓글 삭제 성공',
  PARENT_TYPE_ERROR: '부모는 post 혹은 comment여야 합니다.',
};
