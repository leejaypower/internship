const { rentalQuery } = require('../../repository');

const getAll = async () => {
  const rentalList = await rentalQuery.getListAll();
  return rentalList;
};

const getListByUserIds = async (userIds) => {
  const rentalList = await rentalQuery.getListByInputData({ userId: userIds });
  return rentalList;
};

const getListByBookIds = async (bookIds) => {
  const rentalList = await rentalQuery.getListByInputData({ bookId: bookIds });
  return rentalList;
};

const getOneById = async (id) => {
  const rentalInfo = await rentalQuery.getOneById(id);
  return rentalInfo;
};

module.exports = {
  getAll,
  getListByUserIds,
  getListByBookIds,
  getOneById,
};
