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

  // post
  POST_CREATED: '게시글 생성 성공',
  POST_UPDATED: '게시글 수정 성공',
  POST_DELETED: '게시글 삭제 성공',

  // comment
  COMMENT_CREATED: '댓글 생성 성공',
  COMMENT_UPDATED: '댓글 수정 성공',
  COMMENT_DELETED: '댓글 삭제 성공',
};
