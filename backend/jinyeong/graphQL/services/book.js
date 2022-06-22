const { bookQuery } = require('../../repository');

const getAll = async () => {
  const bookList = await bookQuery.getAll();
  return bookList;
};

const getAllByIds = async (ids) => {
  const bookList = await bookQuery.getAllByIds(ids);
  return bookList;
};

const getById = async (id) => {
  const book = await bookQuery.getOneById(id);
  return book;
};

const createBook = async (bookInfoId) => {
  const result = await bookQuery.createBook({ bookInfoId });
  return result;
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
  createBook,
};
