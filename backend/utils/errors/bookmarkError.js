const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

// 이미 북마크인 경우, 북마크 증가 방지
class AlreadyBookmarkError extends Error {
  // 400
  constructor(
    message = responseMessage.ALREADY_BOOKMARK,
    status = statusCode.BAD_REQUEST,
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.AlreadyBookmarkError = AlreadyBookmarkError;

// 해당 북마크가 존재하지 않을 경우
class NoBookmarkError extends Error {
  // 400
  constructor(
    message = responseMessage.NO_BOOKMARK,
    status = statusCode.BAD_REQUEST,
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.NoBookmarkError = NoBookmarkError;
