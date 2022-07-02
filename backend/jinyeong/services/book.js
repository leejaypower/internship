const { bookQuery, bookInfoQuery } = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async () => {
  const bookList = await bookQuery.getListAll();
  return bookList;
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookList = await bookQuery.getAllByIds(ids);
  return bookList;
};

const getById = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const book = await bookQuery.getOneById(id);

  if (!book) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  return book;
};

const createBook = async (body) => {
  const { bookInfoId } = body;

  if (!bookInfoId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const bookInfo = await bookInfoQuery.getOneById(bookInfoId);

  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.DB_INVALID_REFERENCE);
  }

  const createdBook = await bookQuery.createBook({ bookInfoId });
  return createdBook;
};

const updateBook = async (id, body) => {
  if (!id || typeof body !== 'object') {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const { bookInfoId } = body;

  const bookInfo = await bookInfoQuery.getOneById(bookInfoId);

  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.DB_INVALID_REFERENCE);
  }

  await bookQuery.updateBook(id, body);
};

const deleteBook = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

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
