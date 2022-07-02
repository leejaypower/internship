const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const service = require('../../../service');
const auth = require('../auth');

const Reservation = {
  Query: {},
  Mutation: {
    createReservation: async (parent, args, context) => {
      const { bookId } = args;
      const userMail = context.email;

      const result = await service.reservation.createReservation(bookId, userMail);
      return result;
    },
  },
};

const resolverComposition = {
  'Mutation.*': [auth.user()],
};

const composedResolvers = composeResolvers(Reservation, resolverComposition);

module.exports = composedResolvers;
