const service = require('../../../service');

const createRental = async (rentalData, userEmail) => {
  const result = await service.rental.createRental(rentalData, userEmail);
  return result;
};

const getRentals = async (rentalQuery) => {
  const result = await service.rental.getRentals(rentalQuery);
  return result;
};

const getRentalsAllByIds = async (ids) => {
  const result = await service.rental.getRentalsAllByIds(ids);
  return result;
};

module.exports = {
  createRental,
  getRentals,
  getRentalsAllByIds,
};
