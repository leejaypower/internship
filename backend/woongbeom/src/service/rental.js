const repository = require('../repository');
const { sequelize } = require('../db/models');
const lib = require('../lib');

/**
 * 도서 대출 (파라미터 수정 필요합니다. 추가로 작업하겠습니다.)
 * @param { Object } rentalData 도서의 id, 유저의 id -> 수정 필요
 * @param { String } userEmail 유저의 이메일
 */
const createRental = async (rentalData, userEmail) => {
  const result = await sequelize.transaction(async (transaction) => {
    const user = await repository.user.getUserById(rentalData.userId);

    if (user.email !== userEmail) {
      lib.util.error.errorHandler(1, 'You cannot rent book by other\'s account');
    }

    const book = await repository.book.getBookById(rentalData.bookId);
    if (!book) {
      lib.util.error.errorHandler(1, 'Book does not exist');
    }

    if (book.statusCode === 1) { // 1: 대출중
      lib.util.error.errorHandler(1, 'This book is already occupied');
    }
    if (book.statusCode === 2) { // 2. 예약중
      lib.util.error.errorHandler(1, 'This book is already on reservation');
    }

    const status = { statusCode: 1 };
    await repository.book.updateBook(
      rentalData.bookId,
      status,
      { transaction },
    );

    const newRental = await repository.rental.createRental(rentalData, { transaction });
    return newRental;
  });
  return result;
};

const getRentals = async (rentalQuery) => {
  const rentalList = await repository.rental.getRentals(rentalQuery);
  return rentalList;
};

const getRentalsAllByIds = async (ids) => {
  const rentalList = await repository.rental.getRentalsAllByIds(ids);
  return rentalList;
};

module.exports = {
  createRental,
  getRentals,
  getRentalsAllByIds,
};
