const repository = require('../repository/index');

const createBook = async (bookData) => {
  try {
    const { title } = bookData;
    const newBookData = await repository.book.createBook({ title });
    return newBookData;
  } catch (err) {
    return err.message;
  }
};

const getListAll = async () => {
  try {
    const bookList = await repository.book.getListAll();
    return bookList;
  } catch (err) {
    return err.message;
  }
};

module.exports = { createBook, getListAll };
