const { Book } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getListAll = async () => {
  const bookList = await Book.findAll();

  return bookList.map((book) => {
    return book.dataValues;
  });
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookList = await Book.findAll({ where: { id: ids } });

  return bookList.map((book) => {
    return book.dataValues;
  });
};

const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const book = await Book.findOne({ where: { id } });
  return book?.dataValues;
};

const createBook = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const createdBook = await Book.create(inputData);
  return createdBook?.dataValues;
};

const updateBook = async (id, inputData) => {
  if (!id || typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const updatedBook = await Book.update(inputData, { where: { id } });
  return updatedBook;
};

const deleteBook = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await Book.destroy({ where: { id } });
};

module.exports = {
  getListAll,
  getOneById,
  createBook,
  updateBook,
  deleteBook,
  getAllByIds,
};
