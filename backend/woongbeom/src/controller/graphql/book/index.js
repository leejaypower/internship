const repository = require('../../../repository');

const createBook = async (bookData) => {
  const result = await repository.book.createBook(bookData);
  return result;
};

const getBooks = async (bookQuery) => {
  const result = await repository.book.getBooks(bookQuery);
  return result;
};

const getBookById = async (id) => {
  const result = await repository.book.getBookById(id);
  return result;
};

const updateBook = async (updateBookId, updateData) => {
  const result = await repository.book.updateBook(updateBookId, updateData);
  return result;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
};
