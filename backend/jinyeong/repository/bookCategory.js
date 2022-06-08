const { BookCategory } = require('../db');

// BookCategory SELECT ALL
const getAll = async () => {
  const bookCategoryList = await BookCategory.findAll({ returning: true });
  return bookCategoryList;
};

// BookCategory SELECT ALL IN ids
const getAllByIds = async (ids) => {
  const bookCategoryList = await BookCategory.findAll({
    where: { id: ids },
  });

  return bookCategoryList.map((bookCategory) => {
    return bookCategory.dataValues;
  });
};

// BookCategory SELECT By Id
const getById = async (id) => {
  const bookCategory = await BookCategory.findOne({
    returning: true,
    where: { id },
  });
  return bookCategory;
};

module.exports = {
  getAll,
  getAllByIds,
  getById,
};
