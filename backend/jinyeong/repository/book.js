/* eslint-disable no-useless-catch */
const { Op } = require('sequelize');
const { Book } = require('../db');

// Books SELECT ALL
const getAll = async () => {
  const bookInfoList = await Book.findAll({ raw: true });
  return bookInfoList;
};

// Books QUERY SELECT By bookName or bookCategory;
const getByQuery = async (query) => {
  // 1. 도서명과 도서 카테고리 모두 입력받은 경우
  if (query.name && query.category) {
    const bookInfoList = await Book.findAll({
      where: {
        [Op.and]: [
          { name: { [Op.like]: `%${query.name}%` } },
          { category: query.category },
        ],
      },
      raw: true,
    });

    return bookInfoList;
  }
  // 2. 둘 중 하나만 입력받은 경우
  const bookInfoList = await Book.findAll({
    // 쿼리 조건문
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query.name}%` } },
        { category: query.category || '' },
      ],
    },
    raw: true,
  });

  return bookInfoList;
};

// Books SELECT ONE By ID
const getById = async (id) => {
  const bookInfo = await Book.findOne({ where: { id }, raw: true });
  return bookInfo;
};

// Books INSERT ONE
const insertOne = async (inputData) => {
  await Book.create(inputData);
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
  getByQuery,
  getById,
  insertOne,
  updateOneById,
  deleteOneById,
};
