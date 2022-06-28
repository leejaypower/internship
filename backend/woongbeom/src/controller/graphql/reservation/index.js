const service = require('../../../service');

const createReservation = async (bookId, userEmail) => {
  const result = await service.reservation.createReservation(bookId, userEmail);
  return result;
};

module.exports = {
  createReservation,
};
