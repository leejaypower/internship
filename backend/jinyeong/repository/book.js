/* eslint-disable no-useless-catch */
const { Book } = require('../db');

// Books SELECT ALL
const getAll = async () => {
  const bookList = await Book.findAll({
    returning: true,
  });
  return bookList;
};

// Books SELECT ONE By ID
const getById = async (id) => {
  const book = await Book.findOne({
    where: { id },
    returning: true,
  });
  return book;
};

// Books INSERT ONE
const insertOne = async (inputData) => {
  const result = await Book.create(inputData);
  return result;
};

// Books UPDATE ONE By ID
const updateOneById = async (id, inputData) => {
  await Book.update(inputData, { where: { id } });
};

// Books DELETE ONE By ID
const deleteOneById = async (id) => {
  // TODO: 누가, 언제 지웠는지 로그 쌓을 수 있도록 구현하기
  await Book.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  insertOne,
  updateOneById,
  deleteOneById,
};
