// 사용자 역할 상수
const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

// 토큰 관련 상수
const token = {
  expiresIn: '1 day',
};

// 도서 상태코드 상수
const bookStatus = {
  availableForRental: 0,
  currentlyBorrowed: 1,
  reserved: 2,
};

// 카프카
const topic = {
  returnReservedBook: 'internship-woongbeom-returnReservedBook',
};

module.exports = {
  ROLE,
  token,
  bookStatus,
  topic,
};

/**
 * role 소문자 작업하자 (이전 pr에서 했는데 꼬였습니다)
 */
