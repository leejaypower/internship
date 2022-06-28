const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const controller = require('../../../controller/graphql');
const middleware = require('../auth');

const Reservation = {
  Query: {},
  Mutation: {
    createReservation: async (parent, reservationData, context) => {
      const book = reservationData.bookId;
      const userMail = context.email;

      const result = await controller.reservation.createReservation(book, userMail);
      return result;
    },
  },
};

const resolverComposition = {
  'Mutation.*': [middleware.Mutation.isAuthenticatedUser()],
};

const composedResolvers = composeResolvers(Reservation, resolverComposition);

module.exports = composedResolvers;
