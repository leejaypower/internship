const { BookInfo } = require('../db');
const { util, constants } = require('../common');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

const getListAll = async () => {
  const bookInfoList = await BookInfo.findAll();

  /*
    NOTE
    도서정보 테이블에 대한 조회는 도서명이 여러 언어일 수 있기 때문에, 각 언어의 정렬기준에 따라 나열하기 위해
    별도의 정렬로직을 추가
  */
  bookInfoList.sort((bookInfo1, bookInfo2) => {
    const name1 = bookInfo1.name;
    const name2 = bookInfo2.name;
    return name1.localeCompare(name2);
  });

  return bookInfoList.map((bookInfo) => {
    return bookInfo.dataValues;
  });
};

// BookInfo SELECT ALL IN ARRAY
const getAllByIds = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookInfoList = await BookInfo.findAll({ where: { id: ids } });

  return bookInfoList.map((bookInfo) => {
    return bookInfo.dataValues;
  });
};

const getOneById = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bookInfo = await BookInfo.findOne({ where: { id } });
  return bookInfo?.dataValues;
};

const createBookInfo = async (inputData) => {
  if (typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await BookInfo.create(inputData);
};

const updateBookInfo = async (id, inputData) => {
  if (!id || typeof inputData !== 'object') {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await BookInfo.update(inputData, { where: { id } });
};

const deleteBookInfo = async (id) => {
  if (!id) {
    throw new errorHandler.CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  await BookInfo.destroy({ where: { id } });
};

module.exports = {
  getListAll,
  getOneById,
  getAllByIds,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
};
