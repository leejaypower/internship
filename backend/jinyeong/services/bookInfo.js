/* eslint-disable no-useless-catch */
const { bookInfoQuery, bookCategoryQuery } = require('../repository');
const { util } = require('../common');

const { errorHandling } = util;

const getAll = async () => {
  const bookInfoList = await bookInfoQuery.getAll();
  return bookInfoList;
};

const getById = async (id) => {
  const bookInfo = await bookInfoQuery.getById(id);

  if (!bookInfo) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  return bookInfo;
};

const createBookInfo = async (body) => {
  const {
    categoryId,
  } = body;

  // NOTE: 사전에 정의된 카테고리가 아닌 경우, 도서정보를 생성할 수 없기에 카테고리 DB를 확인
  const bookCategory = await bookCategoryQuery.getById(categoryId);

  if (!bookCategory) {
    errorHandling.throwError(400, '입력가능한 카테고리가 아닙니다.');
  }

  await bookInfoQuery.createBookInfo(body);
};

const updateBookInfo = async (id, body) => {
  const {
    categoryId,
  } = body;

  if (categoryId) {
    const bookCategory = await bookCategoryQuery.getById(categoryId);

    if (!bookCategory) {
      errorHandling.throwError(400, '입력가능한 카테고리가 아닙니다.');
    }
  }

  await bookInfoQuery.updateBookInfo(id, body);
};

const deleteBookInfo = async (id) => {
  const deleteTestResult = await bookInfoQuery.getById(id);

  if (!deleteTestResult) {
    errorHandling.throwError(404, '요청에 해당하는 정보가 존재하지 않습니다.');
  }

  await bookInfoQuery.deleteBookInfo(id);
};

module.exports = {
  getAll,
  getById,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
};
