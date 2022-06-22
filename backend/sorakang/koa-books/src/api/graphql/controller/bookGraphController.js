const { ApolloError } = require('apollo-server-koa');
const { bookService } = require('../../../services');
const { bookGraphService } = require('../service');

// bookService는 rest api와 공통으로 사용하는  Service
// bookGraphService 는 graphql에서만 사용하는 service입니다
// bookService와 bookGraphService는 refactoring 주차에 정리할 예정입니다.

const getAllBooks = async (parent, { limit, afterCursor = `${new Date().getTime()}-1` }, context) => {
  // cursor 분리..
  const cursorArray = afterCursor.split('-');
  const curCursor = new Date(Number(cursorArray[0]));
  const bookId = Number(cursorArray[1]);

  const bookList = bookGraphService.getAllBooks(parent, { limit, curCursor, bookId }, context);
  return bookList;
};

const getBooksById = async (parent, { bookIds }, _) => {
  const bookList = await bookService.getBooksById(bookIds);
  return bookList;
};

const getBookBySerialId = async (parent, { serialId }, _) => {
  const book = await bookGraphService.getBookBySerialId(serialId);
  return book;
};

const createBook = async (parent, { bookInfo }, _) => {
  try {
    const data = await bookGraphService.createBook(bookInfo);

    return data;
  } catch (err) {
    throw Error(err);
  }
};

const updateBook = async (parent, { updateInfo }, _) => {
  try {
    const { bookId, ...bookInfo } = updateInfo;

    const isUpdated = await bookService.updateBook(bookId, bookInfo);

    return { message: 'Successfully updated' };
  } catch (err) {
    throw Error(err);
  }
};

const deleteBook = async (parent, { bookIdList }, _) => {
  const deletedCount = await bookGraphService.deleteBook(bookIdList);

  if (!deletedCount) {
    throw new ApolloError('Delete Rejected: Data does not exist');
  }
  return { message: 'Successfully deleted' };
};
module.exports = {
  getAllBooks, getBooksById, createBook, updateBook, getBookBySerialId, deleteBook,
};
