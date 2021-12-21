const statusCode = require('../../globals/statusCode');
const responseMessage = require('../../globals/responseMessage');
const Error = require('./errors');

// 카테고리가 project 혹은 study가 아닐 경우 에러
class CategoryTypeError extends Error {
  constructor(
    message = responseMessage.POST_TYPE_CHECK,
    status = statusCode.BAD_REQUEST,
  ) {
    super(message);
    this.status = status;
  }
}

// stack이 소문자로만 이루어지지 않을 경우 에러
class StackNotLowerCaseError extends Error {
  constructor(
    message = responseMessage.STACK_CHECK,
    status = statusCode.BAD_REQUEST,
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.CategoryTypeError = CategoryTypeError;
module.exports.StackNotLowerCaseError = StackNotLowerCaseError;
