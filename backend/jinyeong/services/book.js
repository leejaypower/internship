const { bookQuery, bookInfoQuery } = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async () => {
  const bookList = await bookQuery.getListAll();
  return bookList;
};

const getAllByIds = async (ids) => {
  const bookList = await bookQuery.getAllByIds(ids);
  return bookList;
};

const getById = async (id) => {
  const book = await bookQuery.getOneById(id);

  if (!book) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  return book;
};

const createBook = async (body) => {
  const { bookInfoId } = body;

  const bookInfo = await bookInfoQuery.getOneById(bookInfoId);

  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.DB_INVALID_REFERENCE);
  }

  const createdBook = await bookQuery.createBook({ bookInfoId });
  return createdBook;
};

const updateBook = async (id, body) => {
  const { bookInfoId } = body;

  const bookInfo = await bookInfoQuery.getOneById(bookInfoId);

  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.DB_INVALID_REFERENCE);
  }

  await bookQuery.updateBook(id, body);
};

const deleteBook = async (id) => {
  const deleteTestResult = await bookQuery.getOneById(id);

  if (!deleteTestResult) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  await bookQuery.deleteBook(id);
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
  createBook,
  updateBook,
  deleteBook,
};
