class CustomError extends Error {
  constructor(code, inputMessage, ...params) {
    super(...params);

    this.code = code;
    this.inputMessage = inputMessage;
  }
}

const httpStatusCodeErrorMapping = {
  // Bad Request
  BAD_REQUEST: 400,
  REQUIRED_INPUT_NULL: 400,
  BAD_USER_INPUT: 400,
  SIGNUP_EMAIL_REDUPLICATED: 400,
  DB_INVALID_REFERENCE: 400,
  INVALID_INPUT_DATA: 400,
  NOT_AVAILABLE_REQUEST: 400,
  INVALID_INPUT_TYPE: 400,
  INVALID_EMAIL_REGEX: 400,
  INVALID_PASSWORD_REGEX: 400,
  INVALID_CONTACT_REGEX: 400,

  // Unauthorized
  NEED_AUTHENTICATE: 401,
  INVALID_TOKEN: 401,
  INVALID_LOGIN_ACCESS: 401,
  UNAUTHORIZED_REQUEST: 401,
  INVALID_ADMIN_SECRET_CODE: 401,
  DUPLICATE_LOGIN: 401,

  // Forbidden
  NEED_PERMISSION: 403,
  FORBIDDEN_USER_REQUEST: 403,
  NOT_ALLOWED_OTHERS: 403,
  THIS_ROLE_NOT_AUTHORIZED: 403,

  // Not Found
  NON_RESOURCE_EXIST: 404,

  // Unexpected Error
  INTERNAL_SERVER_ERROR: 500,
};

const messageErrorMapping = {
  // Bad Request
  BAD_REQUEST: '잘못된 요청입니다',
  REQUIRED_INPUT_NULL: '필수 입력요소가 누락되었습니다',
  BAD_USER_INPUT: '요청한 스키마가 유효하지 않습니다',
  SIGNUP_EMAIL_REDUPLICATED: '입력하신 이메일은 이미 존재합니다',
  DB_INVALID_REFERENCE: '데이터베이스 참조관계가 유효하지 않습니다',
  INVALID_INPUT_DATA: '입력하신 정보가 유효하지 않습니다',
  NOT_AVAILABLE_REQUEST: '요청 가능한 상태가 아닙니다',
  INVALID_INPUT_TYPE: '입력데이터 타입이 유효하지 않습니다',
  INVALID_EMAIL_REGEX: '이메일 형식이 유효하지 않습니다',
  INVALID_PASSWORD_REGEX: '비밀번호 형식이 유효하지 않습니다',
  INVALID_CONTACT_REGEX: '연락처 형식이 유효하지 않습니다',

  // Unauthorized
  NEED_AUTHENTICATE: '인증이 필요한 요청입니다',
  INVALID_TOKEN: '토큰이 유효하지 않습니다',
  INVALID_LOGIN_ACCESS: '로그인 요청 실패',
  UNAUTHORIZED_REQUEST: '해당 요청에 대한 권한이 없습니다',
  INVALID_ADMIN_SECRET_CODE: '시크릿 코드가 유효하지 않습니다',
  DUPLICATE_LOGIN: '중복 로그인 되어 현재 계정은 차단됩니다(다시 로그인해주세요)',

  // Forbidden
  NEED_PERMISSION: '권한이 필요한 요청입니다',
  FORBIDDEN_USER_REQUEST: '요청이 금지된 유저입니다',
  NOT_ALLOWED_OTHERS: '본인만이 요청할 수 있습니다',
  THIS_ROLE_NOT_AUTHORIZED: '지금의 역할로는 접근할 수 없는 요청입니다',
  NOT_AUTHORIZED: '해당 요청에 대한 권한이 없습니다',

  // Not Found
  NON_RESOURCE_EXIST: '요청하신 정보가 존재하지 않습니다',

  // Unexpected Error
  INTERNAL_SERVER_ERROR: '서버에 에러가 발생했습니다',
};

module.exports = {
  CustomError,
  httpStatusCodeErrorMapping,
  messageErrorMapping,
};
