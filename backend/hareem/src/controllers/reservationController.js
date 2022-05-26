const { reservationService } = require('../services');

const createReservation = async (ctx) => {
  try {
    const { bookInfoId } = ctx.params;
    const { userId } = ctx.request.body; // 차후 ctx.user.id 로 수정 필요
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
    const { userId } = ctx.request.body; // 차후 ctx.user.id 로 수정 필요
    const reservations = await reservationService.getUserReservations(userId, ctx.request.query);
    ctx.body = reservations;
  } catch (error) {
    ctx.throw(error);
  }
};

const deleteReservation = async (ctx) => {
  try {
    const { userId } = ctx.request.body;
    const { id } = ctx.params;
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
