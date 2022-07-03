const { bookInfoQuery, bookCategoryQuery } = require('../repository');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async () => {
  const bookInfoList = await bookInfoQuery.getListAll();

  return bookInfoList;
};

const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookInfoList = await bookInfoQuery.getAllByIds(ids);
  return bookInfoList;
};

const getById = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookInfo = await bookInfoQuery.getOneById(id);

  if (!bookInfo) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  return bookInfo;
};

const createBookInfo = async (body) => {
  const {
    categoryId,
  } = body;

  if (!categoryId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  // NOTE: 사전에 정의된 카테고리가 아닌 경우, 도서정보를 생성할 수 없기에 카테고리 DB를 확인
  const bookCategory = await bookCategoryQuery.getOneById(categoryId);

  if (!bookCategory) {
    throw new CustomError(ERROR_CODE.DB_INVALID_REFERENCE);
  }

  const createdBookInfo = await bookInfoQuery.createBookInfo(body);
  return createdBookInfo;
};

const updateBookInfo = async (id, body) => {
  if (!id || typeof body !== 'object') {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const { categoryId } = body;

  if (categoryId) {
    const bookCategory = await bookCategoryQuery.getOneById(categoryId);

    if (!bookCategory) {
      throw new CustomError(ERROR_CODE.DB_INVALID_REFERENCE);
    }
  }

  const updatedBookInfo = await bookInfoQuery.updateBookInfo(id, body);
  return updatedBookInfo;
};

const deleteBookInfo = async (id) => {
  if (!id) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const deleteTestResult = await bookInfoQuery.getOneById(id);

  if (!deleteTestResult) {
    throw new CustomError(ERROR_CODE.NON_RESOURCE_EXIST);
  }

  await bookInfoQuery.deleteBookInfo(id);
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
};
