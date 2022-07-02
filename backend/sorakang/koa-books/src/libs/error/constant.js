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

module.exports = {
  ERROR_STATE, ERROR_STATE_SERVICE,
};

/*
1. NO_CONTENT_ERROR : 쿼리를 성공했지만 data가 존재하지 않음 200
2. INTERNAL_SERVER_ERROR : 서버 애러입니다 500
3. UNAUTHENTICATED Token이 누락되거나 적절하지 않습니다 401
4. FORBIDDEN : 해당 페이지에 권한이 없습니다 403
5. CUSTOM_ERROR : 서비스 제공 불가능 ( 예약이 안된다던지 - 비즈니스 로직의 이유)
    1. 도서 대여
        1. 도서 대여 불가능 : 이유
    2. 도서 예약
        1. 도서 예약 불가능 : 이유
    3. 도서 연장
        1. 도서 연장 불가능 : 이유

*/
