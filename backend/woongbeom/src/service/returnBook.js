const { sequelize } = require('../db/models');
const repository = require('../repository');
const lib = require('../lib');
const kafka = require('../kafka');

const { constant } = lib.common;
const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

/**
 * 도서 반납
 * @param { Number } rentalId 도서 대여 번호
 */
const createReturn = async (rentalId) => {
  const rental = await repository.rental.getRentalById(rentalId);
  if (!rental) {
    throw new CustomError(errorCode.noDataExist, '[src/service/returnBook.js]');
  }

  const book = await repository.book.getBookById(rental.bookId);
  if (book.statusCode === constant.bookStatus.availableForRental) {
    throw new CustomError(errorCode.alreadyReturned, '[src/service/returnBook.js]');
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
