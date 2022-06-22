const { reservationQuery } = require('../../repository');

const getAll = async () => {
  const rentalList = await reservationQuery.getListAll();
  return rentalList;
};

const getOneById = async (id) => {
  const rentalInfo = await reservationQuery.getOneById(id);
  return rentalInfo;
};

module.exports = {
  getAll,
  getOneById,
};
