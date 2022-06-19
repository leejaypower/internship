const repository = require('../repository');

const createBook = async (bookData) => {
  const newBookData = await repository.book.createBook(bookData);
  return newBookData;
};

const getBooks = async (bookQuery) => {
  const bookList = await repository.book.getBooks(bookQuery);
  return bookList;
};

const getBookById = async (id) => {
  const book = await repository.book.getBookById(id);
  return book;
};

const updateBook = async (id, data) => {
  const numOfUpdatedRow = await repository.book.updateBook(id, data);
  return numOfUpdatedRow;
};

module.exports = {
  createBook, getBooks, getBookById, updateBook,
};
