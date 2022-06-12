// 구분해야할 것 같아서 구분해서 객체화 했는데
// 이렇게 되면 깊이가 깊어져서 다른 분들이
// 코드를 확인하는데에 방해가 될 수 있을까요?

// 서비스 정책 관련 상수
const BUSINESS = {
  RENTAL_PERIOD: 7,
  EXTEND_PERIOD: 7,
  MAX_RENTAL_NUM: 3,
  MAX_EXTEND_COUNT: 3,
  MAX_WARNING_COUNT: 3,
  DAYS_BEFORE_RETURN: 3,
  BOOK_REGIGISTATION_LIMIT: 5,
  PAGE_DEFAULT: 1,
  PER_PAGE: 10,
  HASH_SALT: 10,
};

// 테이블 관련 상수
const TABLE = {
  USER_ROLE: { USER: 'USER', ADMIN: 'ADMIN' },
  RENTAL_STATE: { START: 'START', EXTEND: 'EXTEND', END: 'END' },
};

// 쿼리 관련 상수
const QUERY = {
  FILTER: { NONE: 'NONE', ALL: 'ALL', DELETED: 'DELETED' },
};

// 메시지
const MESSAGE = {
  AUTH_ERROR: '유효하지 않은 접근입니다',
};

// 쿠키 이름 관련 상수
const COOKIE_NAME = {
  REFRESH_TOKEN: 'refresh_token',
};

module.exports = {
  BUSINESS,
  TABLE,
  QUERY,
  MESSAGE,
  COOKIE_NAME,
};
