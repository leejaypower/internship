const db = require('../db/models');

const createReservation = async (bookId, userId) => {
  const newReservation = await db.Reservation.create({ bookId, userId });
  return newReservation;
};

const getReservationByBookId = async (bookId) => {
  const reservation = await db.Reservation.findOne({
    where: { bookId },
  });
  return reservation;
};

module.exports = { createReservation, getReservationByBookId };
