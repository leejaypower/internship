const repository = require('../repository');

const createBook = async (bookData) => {
  const newBookData = await repository.book.createBook(bookData);
  return newBookData;
};

const getListAll = async () => {
  const bookList = await repository.book.getListAll();
  return bookList;
};

module.exports = { createBook, getListAll };
