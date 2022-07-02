const { bookCategoryQuery } = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async () => {
  const bookCategoryList = await bookCategoryQuery.getListAll();
  return bookCategoryList;
};

const getAllByIds = async (ids) => {
  const bookInfoList = await bookCategoryQuery.getAllByIds(ids);
  return bookInfoList;
};

const getById = async (id) => {
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

  await bookCategoryQuery.createBookCategory({
    koreanDecimalClassificationCode,
    name,
  });
};

const deleteBookCategory = async (id) => {
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
