const { ApolloError } = require('apollo-server-koa');
const { reservationGraphService } = require('../service');
const { reserveService } = require('../../../services');

const getAllReservation = async (parent, { limit, afterCursor, search }, context) => {
  const data = await reservationGraphService.getAllReservation({ limit, afterCursor, search });
  return data;
};

const getReservationByUserId = async (parent, { userId }, context) => {
  const reservation = await reservationGraphService.getReservationByUserId({ userId });
  return reservation;
};

const createReservation = async (parent, { userId, bookId }, context) => {
  const { reservationInfo } = await reserveService.createReservation(userId, bookId);
  return reservationInfo;
};

const updateReservation = async (parent, { reservationInfo, userId }, context) => {
  const reservationUpdated = await reservationGraphService.updateReservation(reservationInfo, userId);
  if (!reservationUpdated?.length) {
    return { message: 'Update failed' };
  }

  return { message: 'SuccessFully updated' };
};

const deleteReservation = async (parent, { reservationId }, context) => {
  const { reservationInfo } = await reservationGraphService.deleteReservation(reservationId);
  return reservationInfo;
};

module.exports = {
  getAllReservation,
  getReservationByUserId,
  createReservation,
  updateReservation,
  deleteReservation,
};
