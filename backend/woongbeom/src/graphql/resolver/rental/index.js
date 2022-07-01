const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const service = require('../../../service');
const middleware = require('../auth');

const Rental = {
  Query: {
    getRentals: async (parent, args) => {
      const rentalQuery = args;
      const result = await service.rental.getRentals(rentalQuery);
      return result;
    },
  },
  Mutation: {
    createRental: async (parent, args, context) => {
      const rentalData = args;
      const userEmail = context.email;

      const result = await service.rental.createRental(rentalData, userEmail);
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
