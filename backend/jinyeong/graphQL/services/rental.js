const { rentalQuery } = require('../../repository');

const getAll = async () => {
  const rentalList = await rentalQuery.getListAll();
  return rentalList;
};

const getOneById = async (id) => {
  const rentalInfo = await rentalQuery.getOneById(id);
  return rentalInfo;
};

module.exports = {
  getAll,
  getOneById,
};
