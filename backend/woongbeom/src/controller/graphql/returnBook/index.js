const service = require('../../../service');

const createReturn = async (rentalId) => {
  const result = await service.returnBook.createReturn(rentalId);
  return result;
};

module.exports = {
  createReturn,
};
