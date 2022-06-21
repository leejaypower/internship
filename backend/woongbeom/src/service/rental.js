const repository = require('../repository');
const { sequelize } = require('../db/models');
const { errorHandler } = require('../../lib/util/error');

const createRental = async (rentalData, userEmail) => {
  const result = await sequelize.transaction(async (transaction) => {
    const user = await repository.user.getUserById(rentalData.userId);

    if (user.email !== userEmail) {
      errorHandler(1, 'You cannot rent book by other\'s account');
    }

    const book = await repository.book.getBookById(rentalData.bookId);
    if (!book) {
      errorHandler(1, 'Book does not exist');
    }
    if (book.statusCode !== 0) {
      errorHandler(1, 'This book is already occupied');
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

module.exports = {
  createRental,
};
