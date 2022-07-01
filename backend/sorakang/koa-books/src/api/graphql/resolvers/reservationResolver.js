const service = require('../../../services');
const { bookDateLoader } = require('../dataLoader');

const reserveResolver = {

  Reservation: {
    book: async (parent, _args, _context) => {
      const { bookId } = parent.dataValues;
      const bookList = await bookDateLoader.load(bookId);
      return bookList;
    },
  },

  Query: {
    getAllReservation: async (parent, { limit = 5, afterCursor, search }, _context) => {
      const data = await service.gql.reservation.getAllReservation({ limit, afterCursor, search });
      return data;
    },

    getReservationByUserId: async (parent, { _args }, context) => {
      const { id: userId } = context.user;
      const reservation = await service.gql.reservation.getReservationByUserId({ userId });
      return reservation;
    },
  },

  Mutation: {
    createReservation: async (parent, { bookId }, context) => {
      const { id: userId } = context.user;
      const { reservationInfo } = await service.reservation.createReservation(userId, bookId);
      return reservationInfo;
    },

    updateReservation: async (parent, { reservationInfo, userId }, _context) => {
      const reservationUpdated = await service.gql.reservation.updateReservation(reservationInfo, userId);

      if (!reservationUpdated?.length) {
        return { message: 'Update failed' };
      }
      return { message: 'SuccessFully updated' };
    },

    deleteReservation: async (parent, { reservationId }, _context) => {
      const { reservationInfo } = await service.gql.reservation.deleteReservation(reservationId);
      return reservationInfo;
    },

  },
};
module.exports = reserveResolver;
