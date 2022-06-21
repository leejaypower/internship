const service = require('../../../service');

const createRental = async (rentalData, userEmail) => {
  const result = await service.rental.createRental(rentalData, userEmail);
  return result;
};

module.exports = {
  createRental,
};
