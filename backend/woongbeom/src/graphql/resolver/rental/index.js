const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const controller = require('../../../controller/graphql');
const middleware = require('../auth');

const Rental = {
  Query: {
    getRentals: async (parent, rentalQuery) => {
      const result = await controller.rental.getRentals(rentalQuery);
      return result;
    },
  },
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

/**
 * ToDo
 * getRentals 의 자유도를 높이기 보다는, 명확하게 파라미터를 두고 조회하는 방식이 좋아보인다.
 * getRentalById, getRentalByBookId 등등?
 */
