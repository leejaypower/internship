const db = require('../db/models');

const createRental = async (rentalInstance) => {
  const {
    bookId, userId,
  } = rentalInstance;

  const newRental = await db.Rental.create({
    bookId,
    userId,
  });
  return newRental;
};

module.exports = {
  createRental,
};
