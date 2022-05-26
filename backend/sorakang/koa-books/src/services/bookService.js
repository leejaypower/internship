const { bookRepository, bookSerialRepository } = require('../repositories');
const { bookTransaction } = require('../transactions');

const getBook = async (limit, cursor, bookId, search) => {
  try {
    const bookList = await bookRepository.getBook(limit, cursor, bookId, search);

    if (!bookList.length) {
      throw new Error(404, 'No Found'); /// 임시 error handling
    }
    const time = bookList[bookList.length - 1].pubdate.getTime();
    const curId = bookList[bookList.length - 1].id;
    const nextCursor = `${time}-${curId}`;

    return { data: bookList, nextCursor };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const getSingleBook = async (bookId) => {
  try {
    const book = await bookRepository.getSingleBook(bookId);
    const bookSerialList = await bookSerialRepository.getBookSerial(bookId);
    const bookCount = bookSerialList.length;

    if (bookCount === 0) {
      throw new Error(404, 'No Found');
    }

    return { data: { bookInfo: book, bookSerialList, bookCount } };
  } catch (err) {
    throw new Error(err.message); // 임시 error handling
  }
};

const createBook = async (bookList) => {
  try {
    // ? 다수의 transaction을 처리. await -> eslint airbnb에서는 for loop 사용 X
    // for (const bookInfo of bookList) {
    //   const result = await bookTransaction.createBook(bookInfo.book);
    // }
    // ? 책을 등록하는 경우 순서가 보장될 필요가 없음. 수행 속도를 위해 병렬처리 -> Pool 재사용을 하지 않음 -> 등록 권 수의 제한을 둘 수밖에 없음

    await Promise.allSettled(bookList.map(async (bookInfo) => {
      const { book } = bookInfo;
      const promise = await bookTransaction.createBook(book);
      return promise;
    }));

    return { message: 'successfully created' };
  } catch (err) {
    throw new Error(err);
  }
};

const updateBook = async (bookId, bookInfo) => {
  try {
    const isUpdated = await bookRepository.updateBook(bookId, bookInfo);

    if (!isUpdated) {
      const state = 404;
      const message = 'Not found : Book does not exist';
      return { state, message };
    }

    const state = 201;
    const message = 'Successfully patched';
    return { state, message };
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteBook = async (bookIdList) => {
  // 삭제 이력 관련 추후 고민
  const result = await bookRepository.deleteBook(bookIdList);
  return result;
};

module.exports = {
  getBook, getSingleBook, createBook, updateBook, deleteBook,
};
