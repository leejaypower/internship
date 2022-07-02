// 사용자 역할 상수
const role = {
  user: 'user',
  admin: 'admin',
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
  role,
  token,
  bookStatus,
  topic,
};

/**
 * 도서 상태코드 DB 모델링도 string으로 변경하기 (숫자는 가독성을 해친다!)
 */
