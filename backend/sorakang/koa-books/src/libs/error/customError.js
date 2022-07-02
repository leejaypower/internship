/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
const { ApolloError } = require('apollo-server-koa');
const { ERROR_STATE, ERROR_STATE_SERVICE } = require('./constant');

/**
 * 모든 Error의 기본이 되는 Error class
 *
 * name : error name
 * subName : 추가 name
 * statusCode :  status code
 * message :  message
 * subMessage : 추가 message
 */

class BaseError extends Error {
  constructor(name, subName, statusCode, message, subMessage, ...args) {
    super(...args);
    this.name = name;
    this.subName = subName;
    this.statusCode = statusCode;
    this.message = message;
    this.subMessage = subMessage;
    Error.captureStackTrace(this);
  }
}

/**
 * Graphql Error로 mapping하기 위한 Error class
 */
class GraphqlCustomError extends ApolloError {
  constructor(code, message, path, locations, originalError) {
    super(message, code, path, locations);
    this.extensions.code = code;
    this.timestamp = message;
    this.extensions.path = path;
    this.locations = locations;
    this.originalError = originalError;
  }
}
// General Error

/**
 * 쿼리는 성공 했지만 DB에 Da†a가 존재하지 않는 경우의 Error
 *
 * default name : NO_CONTENT_ERROR
 * statusCode : 200
 * default message : 요청은 성공했지만, 데이터가 없습니다
 * subMessage :  부연 message 추가 가능
 */
class NoContentError extends BaseError {
  constructor(subMessage, ...args) {
    super(subMessage, ...args);
    this.name = ERROR_STATE.NO_CONTENT_ERROR.name;
    this.statusCode = ERROR_STATE.NO_CONTENT_ERROR.statusCode;

    const sub = subMessage || '';
    this.message = `${ERROR_STATE.NO_CONTENT_ERROR.message} : ${sub}`;
  }
}

/**
 * 내부 서버 Error
 * default name : INTERNAL_SERVER_ERROR
 * subName : 내부 서버 error의 경우 name을 확실히 알 수 없기 때문에 name이 있다면 추가 가능
 * statusCode : 500
 */
class InternalServerError extends BaseError {
  constructor(subName, message, stack, ...args) {
    super(subName, ...args);

    const sub = subName || '';
    this.name = `${ERROR_STATE.INTERNAL_SERVER_ERROR.name} : ${sub}`;
    this.statusCode = ERROR_STATE.INTERNAL_SERVER_ERROR.statusCode;
    this.message = message;
    this.stack = stack;
  }
}

/**
 * 인증 관련 Error
 * default name : UNAUTHENTICATED
 * statusCode : 401
 * default message : Token이 없거나 적절하지 않습니다
 * subMessage : 기본메시지는 위와 같으나, 부연 message가 필요한 경우 추가 가능
 */
class UnauthenticatedError extends BaseError {
  constructor(subMessage, ...args) {
    super(subMessage, ...args);
    this.name = ERROR_STATE.UNAUTHENTICATED.name;
    this.statusCode = ERROR_STATE.UNAUTHENTICATED.statusCode;

    const sub = subMessage || '';
    this.message = `${ERROR_STATE.UNAUTHENTICATED.message} : ${sub}`;
  }
}

/**
 * 권한 관련 Error
 * default name : FORBIDDEN
 * statusCode : 403
 * default message : 해당 페이지에 권한이 없습니다
 */
class ForbiddenError extends BaseError {
  constructor(subMessage, ...args) {
    super(subMessage, ...args);
    this.name = ERROR_STATE.FORBIDDEN.name;
    this.statusCode = ERROR_STATE.FORBIDDEN.statusCode;

    const sub = subMessage || '';
    this.message = `${ERROR_STATE.FORBIDDEN.message} : ${sub}`;
  }
}

/**
 * 외부 Library를 사용하는 경우 사용되는 Error class
 * 외부 라이브러러의 경우 어떤 error가 발생될지 모르므로 subName을 추가할 수 있도록 함
 * default name : API_ERROR
 */
class APIError extends BaseError {
  constructor(subName, message, statusCode, ...args) {
    super(subName, ...args);

    const sub = subName || '';
    this.name = `${ERROR_STATE.API_ERROR.name} : ${sub}`;
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Service Error CRUD Error

/**
 * Service Error : 데이터 제공 불가능한 경우 사용
 * 요청은 성공했지만, 서비스적으로 데이터 제공이 불가능한 경우
 * EX 대여를 하려는데 예약이 있어서 대여를 못하는경우, 대여를 하는 경우 연체 이력이 있어서 못하는경우
 *

 * default name : DATA_UNAVAILABLE_ERROR
 * statusCode : 200
 * default message : 데이터 제공이 불가능 합니다
 * subMessage : 추가 메시지 작성 가능
 * date : data제공이 불가능한 원인이 되는 data가 있는 경우 추가 가능
 */
class DataUnavailableError extends BaseError {
  constructor(subMessage, ...data) {
    super(subMessage);

    this.name = ERROR_STATE_SERVICE.DataUnavailableError.name;
    this.statusCode = ERROR_STATE_SERVICE.DataUnavailableError.statusCode;
    const sub = subMessage || '';
    this.message = `${ERROR_STATE_SERVICE.DataUnavailableError.message} :${sub}`;
    this.data = data;
  }
}

/**
 * Service Error : Data가 이미 존재하는 경우 사용
 *
 * default name : DATA_ALREADY_EXISTS_ERROR
 * statusCode : 409
 * default message :데이터가 이미 존재합니다
 * subMessage : 추가 메시지 작성 가능
 * date : 원인이 되는 data가 있는 경
 */
class DataAlreadyExistsError extends BaseError {
  constructor(subMessage, ...data) {
    super(subMessage);

    this.name = ERROR_STATE_SERVICE.DATA_ALREADY_EXISTS_ERROR.name;
    this.statusCode = ERROR_STATE_SERVICE.DATA_ALREADY_EXISTS_ERROR.statusCode;

    const sub = subMessage || '';
    this.message = `${ERROR_STATE_SERVICE.DATA_ALREADY_EXISTS_ERROR.message} : ${sub}`;
    this.data = data;
  }
}

module.exports = {
  BaseError,
  NoContentError,
  InternalServerError,
  UnauthenticatedError,
  ForbiddenError,
  APIError,
  DataUnavailableError,
  DataAlreadyExistsError,
  GraphqlCustomError,
};
