// 일반적인 Error
const ERROR_STATE = {
  NO_CONTENT_ERROR: {
    name: 'NO_CONTENT_ERROR',
    statusCode: 200,
    message: '요청은 성공했지만, 데이터가 없습니다',
  },
  INTERNAL_SERVER_ERROR: {
    name: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
  },
  UNAUTHENTICATED: {
    name: 'UNAUTHENTICATED',
    statusCode: 401,
    message: 'Token이 없거나 적절하지 않습니다',
  },
  FORBIDDEN: {
    name: 'FORBIDDEN',
    statusCode: 403,
    message: '해당 페이지에 권한이 없습니다',
  },
  API_ERROR: {
    name: 'API_ERROR',
  },
  VALIDATION_ERROR: {
    name: 'VALIDATION_ERROR',
    statusCode: 400,
    message: '입력값이 유효하지 않습니다',
  },

};

// 서비스 로직에서 발생할 수 있는 Error
const ERROR_STATE_SERVICE = {
  DataUnavailableError: {
    name: 'DATA_UNAVAILABLE_ERROR',
    statusCode: 200,
    message: '데이터 제공이 불가능 합니다',
  },
  DATA_ALREADY_EXISTS_ERROR: {
    name: 'DATA_ALREADY_EXISTS_ERROR',
    statusCode: 409,
    message: '데이터가 이미 존재합니다',
  },

};

const API_ERROR_CONSTANT = {
  TOKEN_EXPIRED_ERROR: 'TokenExpiredError',
};

module.exports = {
  ERROR_STATE, ERROR_STATE_SERVICE, API_ERROR_CONSTANT,
};
