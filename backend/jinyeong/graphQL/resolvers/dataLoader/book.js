const DataLoader = require('dataloader');
const { bookService } = require('../../../services');
const { util, constants } = require('../../../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const batchGetBook = async (bookIds) => {
  if (!Array.isArray(bookIds)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookList = await bookService.getAllByIds(bookIds);

  const mappedList = bookIds.map((bookId) => {
    const filtered = bookList.filter((book) => {
      return book.id === bookId;
    })[0] || null;

    return filtered;
  });

  return mappedList;
};

const batchGetByIds = new DataLoader(batchGetBook);

module.exports = {
  batchGetByIds,
};
