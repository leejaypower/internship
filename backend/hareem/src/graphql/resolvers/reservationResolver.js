const { reservationService } = require('../../services');

module.exports = {
  Reservation: {
    user: async ({ userId }, _, { loaders }) => {
      const user = loaders.reservation.getUser.load(userId);

      return user;
    },

    bookInfo: async ({ bookInfoId }, _, { loaders }) => {
      const bookInfo = loaders.reservation.getBookInfo.load(bookInfoId);

      return bookInfo;
    },
  },

  Query: {
    getReservationsByUsers: async (_, { input }) => {
      const reservations = await reservationService.getUsersReservations({ ...input, only: true });

      return { success: true, reservations };
    },
  },

  Mutation: {
    createReservation: async (_, { input }) => {
      const { userId, bookInfoId } = input;

      const reservation = await reservationService.createReservation(userId, bookInfoId);

      return { success: true, reservation };
    },

    deleteReservation: async (_, { input }) => {
      const { userId, reservationId } = input;

      const result = await reservationService.deleteReservation(userId, reservationId);

      return { success: true, result };
    },
  },
};
