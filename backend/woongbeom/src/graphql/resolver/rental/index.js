const { composeResolvers } = require('@graphql-tools/resolvers-composition');

const service = require('../../../service');
const auth = require('../auth');

const Rental = {
  Query: {
    getRentalsById: async (parent, args) => {
      const rentalQuery = args;
      const result = await service.rental.getRentals(rentalQuery);
      return result;
    },
    getRentalsByBookId: async (parent, args) => {
      const rentalQuery = args;
      const result = await service.rental.getRentals(rentalQuery);
      return result;
    },
    getRentalsByUserId: async (parent, args) => {
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
  'Query.*': [auth.admin()],
  'Mutation.*': [auth.user()],
};

const composedResolvers = composeResolvers(Rental, resolverComposition);

module.exports = composedResolvers;
