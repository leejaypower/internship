const db = require('../db/models');

const createBook = async (bookInstance) => {
  try {
    const newBook = await db.Book.create(bookInstance);
    return newBook;
  } catch (err) {
    throw new Error('Error Occured attempting to create the newBookInstance');
  }
};

const getListAll = async () => {
  try {
    return db.Book.findAll();
  } catch (err) {
    throw new Error('Error Occured attempting to read Books table');
  }
};

module.exports = { createBook, getListAll };
