const { BookInfo } = require('../db');

const getAll = async () => {
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
  const bookInfoList = await BookInfo.findAll({
    where: { id: ids },
  });

  return bookInfoList.map((bookInfo) => {
    return bookInfo.dataValues;
  });
};

const getById = async (id) => {
  const bookInfo = await BookInfo.findOne({ where: { id } });
  return bookInfo?.dataValues;
};

const createBookInfo = async (inputData) => {
  await BookInfo.create(inputData);
};

const updateBookInfo = async (id, inputData) => {
  await BookInfo.update(inputData, { where: { id } });
};

const deleteBookInfo = async (id) => {
  // TODO: 누가, 언제 지웠는지 로그 쌓을 수 있도록 구현하기
  await BookInfo.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
};
