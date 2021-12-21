const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

class DuplicatedError extends Error {
  // 403
  constructor(
    message = responseMessage.DUPLICATE_ERROR,
    status = statusCode.FORBIDDEN,
  ) {
    super(message);
    this.status = status;
  }
}

class NotMatchedUserError extends Error {
  // 400
  constructor(
    message = responseMessage.NO_USER,
    status = statusCode.NOT_FOUND,
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.DuplicatedError = DuplicatedError;
module.exports.NotMatchedUserError = NotMatchedUserError;
