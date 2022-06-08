const { bookRepository, bookSerialRepository } = require('../repositories');
const { transaction } = require('../repositories');
const retry = require('../utils/retry');

const getAllBook = async (limit, cursor, bookId, search) => {
  const bookList = await bookRepository.getAllBook(limit, cursor, bookId, search);

  if (!bookList.length) {
    throw new Error(404, 'No Found'); /// 임시 error handling
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
    throw new Error(404, 'No Found');
  }

  return { data: { bookInfo: book, bookSerialList, bookCount } };
};

// Graphql 과 rest api의 service를 한 개의 파일로 관리할지 분리할지 고민. 공통적으로 사용할 수 있는 부분은 수정해서 같이 사용하는 방향이 좋을까..?
/**
 * Graphql service  -  Get a list of book information with a given book ID list
 * @param {Array} bookIdList
 * @returns Array of book data
 */
const getBooksById = async (bookIdList) => {
  // rest도 gql도 repository는 같이 사용할 수 있도로 구성하는게 좋을 것 같음..지금은 따로 쓰고 refactoring 주에 병합하기
  const bookList = await bookRepository.getBooksById(bookIdList);
  return bookList;
};

const createBook = async (bookList) => {
  const promiseArr = await bookList.map(async (bookInfo) => {
    const promise = await transaction.bookTransaction.createBook(bookInfo.book);
    return promise;
  });

  // retry 횟수 제한 count = 5
  const result = await retry(5, promiseArr, async (book) => {
    const promise = await transaction.bookTransaction.createBook(book);
    return promise;
  });

  if (!result.state) {
    // rejected data도 같이 보내주자
    throw new Error('transaction failed');
  }

  return { message: 'successfully created' };
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

const deleteSingleBook = async (bookId) => {
  // 삭제 이력 관련 추후 고민
  const result = await bookRepository.deleteSingleBook(bookId);
  return result;
};

module.exports = {
  getAllBook, getSingleBook, createBook, updateBook, deleteBook, deleteSingleBook, getBooksById,
};
