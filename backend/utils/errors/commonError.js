const statusCode = require("../../globals/statusCode");
const responseMessage = require("../../globals/responseMessage");
const Error = require("./errors");

//Code : 해당 url 미존재
class NoPageError extends Error {
  constructor(
    message = responseMessage.NO_PAGE_ERROR,
    status = statusCode.NOT_FOUND
  ) {
    super(message);
    this.status = status;
  }
}

//DB에 데이터 미존재
class EntityNotExistError extends Error {
  // 404
  constructor(
    message = responseMessage.ENTITY_NOT_EXIST,
    status = statusCode.NOT_FOUND
  ) {
    super(message);
    this.status = status;
  }
}

class UnAuthorizedError extends Error {
  constructor(
    message = responseMessage.PERMISSION_ERROR,
    status = statusCode.UNAUTHORIZED
  ) {
    super(message);
    this.status = status;
  }
}

class ValidationError extends Error {
  // 400
  constructor(
    message = responseMessage.NULL_VALUE,
    status = statusCode.BAD_REQUEST
  ) {
    super(message);
    this.status = status;
  }
}

class InternalServerError extends Error {
  // 400
  constructor(
    message = responseMessage.INTERNAL_SERVER_ERROR,
    status = statusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.status = status;
  }
}

module.exports.NoPageError = NoPageError;
module.exports.EntityNotExistError = EntityNotExistError;
module.exports.UnAuthorizedError = UnAuthorizedError;
module.exports.ValidationError = ValidationError;
module.exports.InternalServerError = InternalServerError;
