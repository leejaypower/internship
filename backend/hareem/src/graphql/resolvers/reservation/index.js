const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { TABLE } = require('../../../constants');
const { authMiddleware } = require('../../../middlewares');
const { reservationService } = require('../../../services');

const reservationResolver = {
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
    createReservation: async (_, { input }, { ctx }) => {
      const { user } = ctx;
      const { userId, bookInfoId } = input;

      const reservatedUserId = user.role === TABLE.USER_ROLE.USER ? user.id : userId;

      const reservation = await reservationService.createReservation(reservatedUserId, bookInfoId);

      return { success: true, reservation };
    },

    deleteReservation: async (_, { input }, { ctx }) => {
      const { user } = ctx;
      const { userId, reservationId } = input;

      const reservatedUserId = user.role === TABLE.USER_ROLE.USER ? user.id : userId;

      const result = await reservationService.deleteReservation(reservatedUserId, reservationId);

      return { success: true, result };
    },
  },
};

const resolversComposition = {
  'Query.getReservationsByUsers': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
  'Mutation.createReservation': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
  'Mutation.deleteReservation': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
};

const composedReservationResolver = composeResolvers(reservationResolver, resolversComposition);

module.exports = composedReservationResolver;
