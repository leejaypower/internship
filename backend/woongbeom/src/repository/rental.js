const { Op } = require('sequelize');
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

const getRentals = async (rentalQuery) => {
  const {
    id, bookId, userId,
  } = rentalQuery;

  const where = {};
  if (id) {
    where.id = { [Op.eq]: id };
  }
  if (bookId) {
    where.bookId = { [Op.eq]: bookId };
  }
  if (userId) {
    where.userId = { [Op.eq]: userId };
  }

  const rentalList = await db.Rental.findAll({
    where,
    order: [['id', 'ASC']],
  });
  return rentalList;
};

const getRentalById = async (rentalId) => {
  const rental = await db.Rental.findByPk(rentalId);
  return rental;
};

const getRentalsAllByIds = async (ids) => {
  const rentalList = await db.Rental.findAll({
    where: { bookId: ids },
    raw: true,
  });
  return rentalList;
};

module.exports = {
  createRental,
  getRentals,
  getRentalById,
  getRentalsAllByIds,
};
