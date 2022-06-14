const db = require('../db/models');

const createBook = async (bookData) => {
  const {
    title, author, publisher, page,
  } = bookData;
  const newBook = await db.Book.create({
    title,
    author,
    publisher,
    page,
  });
  return newBook;
};

const getListAll = async () => {
  const bookList = await db.Book.findAll();
  return bookList;
};

module.exports = { createBook, getListAll };
