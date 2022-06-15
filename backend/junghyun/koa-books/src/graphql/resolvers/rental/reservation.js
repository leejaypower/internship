const { graphqlReservationController } = require('../../controller');

const bookReservationResolver = {
  Query: {
    getOneReservation: graphqlReservationController.getOneReservation,
    getAdminReservations: graphqlReservationController.getAdminReservations,
    getUserReservations: graphqlReservationController.getUserReservations,
    getOneOldReservation: graphqlReservationController.getOneOldReservation,
    getAdminOldReservations: graphqlReservationController.getAdminOldReservations,
    getUserOldReservations: graphqlReservationController.getUserOldReservations,
  },
  Mutation: {
    createReservation: graphqlReservationController.createReservation,
    cancelReservation: graphqlReservationController.cancelReservation,
  },
  Reservation: {
    bookInfo: async (parent, _, context) => {
      const bookInfo = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfo;
    },
    user: async (parent, _, context) => {
      const user = context.loaders.userByIdLoader.load(parent.userId);
      return user;
    },
  },
  DeactivatedReservation: {
    bookInfo: async (parent, _, context) => {
      const bookInfo = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfo;
    },
    user: async (parent, _, context) => {
      const user = context.loaders.userByIdLoader.load(parent.userId);
      return user;
    },
  },
};

module.exports = { bookReservationResolver };
