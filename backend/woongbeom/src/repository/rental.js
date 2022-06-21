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

const getRentalById = async (rentalId) => {
  const rental = await db.Rental.findByPk(rentalId);
  return rental;
};

module.exports = {
  createRental, getRentalById,
};
