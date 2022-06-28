const repository = require('../repository');
const { sequelize } = require('../db/models');
const lib = require('../../lib');

/**
 * 대출중인 도서를 예약
 * @param { Number } bookId 도서의 번호
 * @param { String } decodedToken 디코드된 유저의 토큰
 * 예약중인 도서를 반납하는 경우 처리가 빠져 있는데, 해당 로직은 kafka 비동기 처리와 연관지어 작성 예정하고 있습니다.
 */
const createReservation = async (bookId, decodedToken) => {
  const userId = decodedToken.id;

  const book = await repository.book.getBookById(bookId);
  if (book.dataValues.statusCode === 0) { // 0: 대출가능
    lib.util.error.errorHandler(1, 'This book can rent. Use rental service.');
  }
  if (book.dataValues.statusCode === 2) { // 2: 예약중
    lib.util.error.errorHandler(1, 'This book already on reservation. Plaease rent other books.');
  }

  const transactionResult = await sequelize.transaction(async (transaction) => {
    const status = { statusCode: 2 }; // 2: 예약중
    await repository.book.updateBook(
      book.dataValues.id,
      status,
      { transaction },
    );

    const newReservation = await repository.reservation.createReservation(
      bookId,
      userId,
      { transaction },
    );
    return newReservation;
  });
  return transactionResult;
};

module.exports = { createReservation };

/**
 * ToDo
 * 다른 서비스 메서드에 대하여도 적용
 * 1. 매번 DB에 접근해야 하는 작업을 토큰에 담아 상수로 관리하기
 * 2. get 하는 메서드는 트랜젝션 바깥 스코프에서 관리하기
 */
