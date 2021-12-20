const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

// parentType이 post나 comment가 아닌 경우
class ParentTypeError extends Error {
  // 400
  constructor(
    message = responseMessage.PARENT_TYPE_ERROR,
    status = statusCode.BAD_REQUEST,
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.ParentTypeError = ParentTypeError;
