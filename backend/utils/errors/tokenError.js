const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

class InvalidTokenError extends Error {
  constructor(
    message = responseMessage.INVALID_TOKEN,
    status = statusCode.UNAUTHORIZED,
  ) {
    super(message);
    this.status = status;
  }
}

class ExpiredTokenError extends Error {
  constructor(
    message = responseMessage.EXPIRED_TOKEN,
    status = statusCode.UNAUTHORIZED,
  ) {
    super(message);
    this.status = status;
  }
}

class EmptyTokenError extends Error {
  constructor(
    message = responseMessage.EMPTY_TOKEN,
    status = statusCode.UNAUTHORIZED,
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.InvalidTokenError = InvalidTokenError;
module.exports.ExpiredTokenError = ExpiredTokenError;
module.exports.EmptyTokenError = EmptyTokenError;
