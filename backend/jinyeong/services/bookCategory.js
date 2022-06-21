/* eslint-disable no-useless-catch */
const { bookCategoryQuery } = require('../repository');
const { util } = require('../common');

const { errorHandling } = util;

const getAll = async () => {
  const bookCategoryList = await bookCategoryQuery.getAll();
  return bookCategoryList;
};

const getById = async (id) => {
  const bookCategory = await bookCategoryQuery.getById(id);

  if (!bookCategory) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  return bookCategory;
};

const createBookCategory = async (body) => {
  const {
    koreanDecimalClassificationCode,
    name,
  } = body;

  await bookCategoryQuery.createBookCategory({
    koreanDecimalClassificationCode,
    name,
  });
};

const deleteBookCategory = async (id) => {
  const deleteTestResult = await bookCategoryQuery.getById(id);

  if (!deleteTestResult) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  await bookCategoryQuery.deleteBookCategory(id);
};

module.exports = {
  getAll,
  getById,
  createBookCategory,
  deleteBookCategory,
};
