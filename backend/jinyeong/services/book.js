const { bookQuery, bookInfoQuery } = require('../repository');
const { util } = require('../common');

const { errorHandling } = util;

const getAll = async () => {
  const bookList = await bookQuery.getListAll();
  return bookList;
};

const getById = async (id) => {
  const book = await bookQuery.getOneById(id);

  if (!book) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  return book;
};

const createBook = async (body) => {
  const { bookInfoId } = body;

  const bookInfo = await bookInfoQuery.getOneById(bookInfoId);

  if (!bookInfo) {
    errorHandling.throwError(400, '입력하신 도서 정보 ID에 해당하는 자료를 찾을 수 없습니다.');
  }

  await bookQuery.createBook({
    bookInfoId,
  });
};

const updateBook = async (id, body) => {
  const { bookInfoId } = body;

  const bookInfo = await bookInfoQuery.getOneById(bookInfoId);

  if (!bookInfo) {
    errorHandling.throwError(400, '입력하신 도서 정보 ID에 해당하는 자료를 찾을 수 없습니다.');
  }

  await bookQuery.updateBook(id, body);
};

const deleteBook = async (id) => {
  const deleteTestResult = await bookQuery.getOneById(id);

  if (!deleteTestResult) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  await bookQuery.deleteBook(id);
};

module.exports = {
  getAll,
  getById,
  createBook,
  updateBook,
  deleteBook,
};
