const { reservationService } = require('../services');

const createReservation = async (ctx) => {
  try {
    const { bookInfoId } = ctx.params;
    const { id: userId } = ctx.user;
    const reservation = await reservationService.createReservation(userId, bookInfoId);
    ctx.body = reservation;
  } catch (error) {
    ctx.throw(error);
  }
};

const getUsersReservations = async (ctx) => {
  try {
    const allReservations = await reservationService.getUsersReservations(ctx.request.query);
    ctx.body = allReservations;
  } catch (error) {
    ctx.throw(error);
  }
};

const getUserReservations = async (ctx) => {
  try {
    const { id: userId } = ctx.user;
    const reservations = await reservationService.getUserReservations(userId, ctx.request.query);
    ctx.body = reservations;
  } catch (error) {
    ctx.throw(error);
  }
};

const deleteReservation = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { id: userId } = ctx.user;
    const reservation = await reservationService.deleteReservation(userId, id);
    ctx.body = reservation;
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = {
  createReservation,
  getUsersReservations,
  getUserReservations,
  deleteReservation,
};
