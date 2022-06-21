const { BookCategory } = require('../db');

// BookCategory SELECT ALL
const getAll = async () => {
  const bookCategoryList = await BookCategory.findAll();

  return bookCategoryList.map((bookCategory) => {
    return bookCategory.dataValues;
  });
};

// BookCategory SELECT ALL IN ids
const getAllByIds = async (ids) => {
  const bookCategoryList = await BookCategory.findAll({ where: { id: ids } });

  return bookCategoryList.map((bookCategory) => {
    return bookCategory.dataValues;
  });
};

// BookCategory SELECT By Id
const getById = async (id) => {
  const bookCategory = await BookCategory.findOne({ where: { id } });
  return bookCategory?.dataValues;
};

const createBookCategory = async (inputData) => {
  await BookCategory.create(inputData);
};

const deleteBookCategory = async (id) => {
  // TODO: 누가, 언제 지웠는지 로그 쌓을 수 있도록 구현하기
  await BookCategory.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
  createBookCategory,
  deleteBookCategory,
};
