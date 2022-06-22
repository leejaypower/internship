const { bookInfoQuery } = require('../../repository');

const getAll = async () => {
  const bookInfoList = await bookInfoQuery.getListAll();
  return bookInfoList;
};

const getAllByIds = async (ids) => {
  const bookInfoList = await bookInfoQuery.getAllByIds(ids);
  return bookInfoList;
};

const getById = async (id) => {
  const bookInfo = await bookInfoQuery.getOneById(id);
  return bookInfo;
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
};
