const { Book } = require('../db');

const getListAll = async () => {
  const bookList = await Book.findAll();

  return bookList.map((book) => {
    return book.dataValues;
  });
};

// Book SELECT ALL IN ids
const getAllByIds = async (ids) => {
  const bookList = await Book.findAll({ where: { id: ids } });

  return bookList.map((book) => {
    return book.dataValues;
  });
};

const getOneById = async (id) => {
  const book = await Book.findOne({ where: { id } });
  return book?.dataValues;
};

const createBook = async (inputData) => {
  await Book.create(inputData);
};

const updateBook = async (id, inputData) => {
  await Book.update(inputData, { where: { id } });
};

const deleteBook = async (id) => {
  // TODO: 누가, 언제 지웠는지 로그 쌓을 수 있도록 구현하기
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
