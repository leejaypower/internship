const { BookInfo } = require('../db');

// BookInfo SELECT ALL
const getAll = async () => {
  const bookInfoList = await BookInfo.findAll({ returning: true });
  return bookInfoList;
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

// BookInfo SELECT By Id
const getById = async (id) => {
  const bookInfo = await BookInfo.findOne({
    returning: true,
    where: { id },
  });
  return bookInfo;
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
};
