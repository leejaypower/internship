const { BookCategory } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getListAll = async () => {
  const bookCategoryList = await BookCategory.findAll();

  return bookCategoryList.map((bookCategory) => {
    return bookCategory.dataValues;
  });
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookCategoryList = await BookCategory.findAll({ where: { id: ids } });

  return bookCategoryList.map((bookCategory) => {
    return bookCategory.dataValues;
  });
};

const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookCategory = await BookCategory.findOne({ where: { id } });
  return bookCategory?.dataValues;
};

const createBookCategory = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await BookCategory.create(inputData);
};

const deleteBookCategory = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await BookCategory.destroy({ where: { id } });
};

module.exports = {
  getListAll,
  getOneById,
  getAllByIds,
  createBookCategory,
  deleteBookCategory,
};
