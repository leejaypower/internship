const { bookRepository, bookSerialRepository } = require('../../repositories');
const { commonUtils, errorHandler } = require('../../libs');
const { sequelize } = require('../../database/models');
const { customError } = require('../../libs').errorHandler;

const getAllBook = async (limit, cursor, bookId, search) => {
  const bookList = await bookRepository.getAllBook(limit, cursor, bookId, search);
  if (!bookList.length) {
    throw new errorHandler.customError.NoContentError();
  }
  const time = bookList[bookList.length - 1].publicationDate.getTime();
  const curId = bookList[bookList.length - 1].id;
  const nextCursor = `${time}-${curId}`;

  return { data: bookList, nextCursor };
};

const getSingleBook = async (bookId) => {
  const book = await bookRepository.getSingleBook(bookId);
  const bookSerialList = await bookSerialRepository.getBookSerial(bookId);
  const bookCount = bookSerialList.length;

  if (bookCount === 0) {
    throw new errorHandler.customError.NoContentError();
  }

  return { data: { bookInfo: book, bookSerialList, bookCount } };
};

/**
 * Graphql service  -  다수의 book id 로 book정보 검색
 * @param {Array} bookIdList
 * @returns Array of book data
 */
const getBooksById = async (bookIdList) => {
  const bookList = await bookRepository.getBooksById(bookIdList);
  if (!bookList?.length) {
    throw new errorHandler.customError.NoContentError();
  }
  return bookList;
};

const createBook = async (bookList) => {
  const createBookTransaction = async (bookData) => {
    const result = await sequelize.transaction(async (t) => {
      const { bookInfo, _ } = await bookRepository.createBook(bookData, t);
      const bookSerial = await bookSerialRepository.createBookSerial(bookInfo, t);
      return { bookInfo, bookSerial };
    });
    return result;
  };

  const promiseArr = await bookList.map(async (bookInfo) => {
    const promise = await createBookTransaction(bookInfo.book);
    return promise;
  });

  // retry 횟수 제한 count = 5
  const result = await commonUtils.retry(5, promiseArr, async (book) => {
    const promise = await createBookTransaction(book);
    return promise;
  });

  if (!result.state) {
    throw new errorHandler.customError.DataUnavailableError('Transaction 실패', result);
  }

  return { message: 'successfully created' };
};

const updateBook = async (bookId, bookInfo) => {
  const isUpdated = await bookRepository.updateBook(bookId, bookInfo);

  if (!isUpdated) {
    throw new errorHandler.customError.NoContentError();
  }

  const state = 201;
  const message = 'Successfully patched';
  return { state, message };
};

const deleteBook = async (bookIdList) => {
  const result = await bookRepository.deleteBook(bookIdList);
  if (!result) {
    throw new errorHandler.customError.NoContentError();
  }
  return result;
};

const deleteSingleBook = async (bookId) => {
  const result = await bookRepository.deleteSingleBook(bookId);

  if (!result) {
    throw new errorHandler.customError.NoContentError();
  }
  return result;
};

module.exports = {
  getAllBook, getSingleBook, createBook, updateBook, deleteBook, deleteSingleBook, getBooksById,
};
