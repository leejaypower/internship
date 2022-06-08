const { bookCategoryQuery } = require('../../repository');

const getAll = async () => {
  const bookCategoryList = await bookCategoryQuery.getAll();
  return bookCategoryList;
};

const getAllByIds = async (ids) => {
  const bookInfoList = await bookCategoryQuery.getAllByIds(ids);
  return bookInfoList;
};

const getById = async (id) => {
  const bookCategory = await bookCategoryQuery.getById(id);
  return bookCategory;
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
};
