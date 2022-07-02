const repository = require('../repository');
const { sequelize } = require('../db/models');
const lib = require('../lib');

const { constant } = lib.common;
const { errorHandler } = lib.util.error;

/**
 * @param { Object } rentalData 도서의 id, 유저의 email
 */
const createRental = async (rentalData) => {
  const { bookId, userEmail } = rentalData;

  const book = await repository.book.getBookById(bookId);
  if (!book) {
    errorHandler(1, 'Book does not exist');
  }

  if (book.statusCode === constant.bookStatus.currentlyBorrowed) {
    errorHandler(1, 'This book is already occupied');
  }
  if (book.statusCode === constant.bookStatus.reserved) {
    errorHandler(1, 'This book is already on reservation');
  }

  const user = await repository.user.getUserByEmail(userEmail);
  const userId = user.id;

  const transactionResult = await sequelize.transaction(async (transaction) => {
    const status = { statusCode: constant.bookStatus.currentlyBorrowed };
    await repository.book.updateBook(
      bookId,
      status,
      { transaction },
    );

    const rentalInstance = { bookId, userId };

    const newRental = await repository.rental.createRental(rentalInstance, { transaction });
    return newRental;
  });

  return transactionResult;
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
