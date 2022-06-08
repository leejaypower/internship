const { bookQuery } = require('../../repository');

const getAll = async () => {
  const bookList = await bookQuery.getAll();
  return bookList;
};

const getById = async (id) => {
  const book = await bookQuery.getById(id);
  return book;
};

const createBook = async (bookInfoId) => {
  const result = await bookQuery.insertOne({ bookInfoId });
  return result;
};

module.exports = {
  getAll,
  getById,
  createBook,
};
