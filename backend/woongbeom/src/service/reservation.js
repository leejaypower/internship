const repository = require('../repository');
const { sequelize } = require('../db/models');
const lib = require('../lib');

const { constant } = lib.common;

/**
 * 대출중인 도서를 예약
 * @param { Number } bookId 도서의 번호
 * @param { String } decodedToken 디코드된 유저의 토큰
 */
const createReservation = async (bookId, decodedToken) => {
  const userId = decodedToken.id;

  const book = await repository.book.getBookById(bookId);
  if (book.dataValues.statusCode === constant.bookStatus.availableForRental) {
    lib.util.error.errorHandler(1, 'This book can rent. Use rental service.');
  }
  if (book.dataValues.statusCode === constant.bookStatus.reserved) {
    lib.util.error.errorHandler(1, 'This book already on reservation. Plaease rent other books.');
  }

  const transactionResult = await sequelize.transaction(async (transaction) => {
    const status = { statusCode: constant.bookStatus.reserved };
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
