const { sequelize } = require('../db/models');
const repository = require('../repository');
const lib = require('../lib');
const kafka = require('../kafka');

const { errorHandler } = lib.util.error;
const { constant } = lib.common;

/**
 * 도서 반납
 * @param { Number } rentalId 도서 대여 번호
 */
const createReturn = async (rentalId) => {
  const rental = await repository.rental.getRentalById(rentalId);
  if (!rental) {
    errorHandler(1, 'This rent number does not exit.');
  }

  const book = await repository.book.getBookById(rental.bookId);
  if (book.statusCode === constant.bookStatus.availableForRental) {
    errorHandler(1, 'This book is already returned');
  }

  if (book.statusCode === constant.bookStatus.reserved) {
    const topicName = constant.topic.returnReservedBook;
    await kafka.producer.messageSender.produceMessage(topicName, book);
  }

  const transactionResult = await sequelize.transaction(async (transaction) => {
    const status = { statusCode: constant.bookStatus.availableForRental };
    await repository.book.updateBook(
      rental.bookId,
      status,
      { transaction },
    );

    const newReturn = await repository.returnBook.createReturn(rentalId, { transaction });
    return newReturn;
  });
  return transactionResult;
};

module.exports = {
  createReturn,
};
