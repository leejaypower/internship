const { bookCategoryQuery } = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async () => {
  const bookCategoryList = await bookCategoryQuery.getListAll();
  return bookCategoryList;
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookInfoList = await bookCategoryQuery.getAllByIds(ids);
  return bookInfoList;
};

const getById = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookCategory = await bookCategoryQuery.getOneById(id);

  if (!bookCategory) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  return bookCategory;
};

const createBookCategory = async (body) => {
  const {
    koreanDecimalClassificationCode,
    name,
  } = body;

  if (!koreanDecimalClassificationCode || !name) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  await bookCategoryQuery.createBookCategory({
    koreanDecimalClassificationCode,
    name,
  });
};

const deleteBookCategory = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const deleteTestResult = await bookCategoryQuery.getOneById(id);

  if (!deleteTestResult) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  await bookCategoryQuery.deleteBookCategory(id);
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
  createBookCategory,
  deleteBookCategory,
};
