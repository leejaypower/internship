const db = require('../db/models');

const createReservation = async (bookId, userId) => {
  const newReservation = await db.Reservation.create({ bookId, userId });
  return newReservation;
};

module.exports = { createReservation };
