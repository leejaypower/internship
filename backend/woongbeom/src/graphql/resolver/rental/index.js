const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const controller = require('../../../controller/graphql');
const middleware = require('../auth');

const Rental = {
  Query: {},
  Mutation: {
    createRental: async (parent, rentalData, context) => {
      const userEmail = context.email;

      const result = await controller.rental.createRental(rentalData, userEmail);
      return result;
    },
  },
};

const resolverComposition = {
  'Mutation.*': [middleware.Mutation.isAuthenticatedUser()],
};
const composedResolvers = composeResolvers(Rental, resolverComposition);

module.exports = composedResolvers;
