const { reservationGraphController, bookGraphController } = require('../controller');
const { bookDateLoader, rentalsBySerialDataLoader } = require('../dataLoader');

const reserveResolver = {

  Reservation: {
    book: async (parent, _args, _context) => {
      const { bookId } = parent.dataValues;
      const bookList = await bookDateLoader.load(bookId);

      return bookList;
    },
  },

  Query: {
    getAllReservation: async (parent, { limit = 5, afterCursor, search }, context) => {
      const data = await reservationGraphController.getAllReservation(parent, { limit, afterCursor, search }, context);
      return data;
    },

    getReservationByUserId: async (parent, { _args }, context) => {
      const { id: userId } = context.user;

      const data = await reservationGraphController.getReservationByUserId(parent, { userId }, context);
      return data;
    },
  },

  Mutation: {
    createReservation: async (parent, { bookId }, context) => {
      const { id: userId } = context.user;
      const data = await reservationGraphController.createReservation(parent, { userId, bookId }, context);
      return data;
    },

    updateReservation: async (parent, { reservationInfo, userId }, context) => {
      const data = await reservationGraphController.updateReservation(parent, { reservationInfo, userId }, context);
      return data;
    },

    deleteReservation: async (parent, { reservationId }, context) => {
      const data = await reservationGraphController.deleteReservation(parent, { reservationId }, context);
      return data;
    },

  },
};
module.exports = reserveResolver;
