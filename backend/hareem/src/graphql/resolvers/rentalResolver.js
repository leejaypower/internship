const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { authMiddleware } = require('../../middlewares');
const { rentalService } = require('../../services');
const { TABLE } = require('../../utils/constants');

const rentalResolver = {
  Rental: {
    user: async ({ userId }, _, { loaders }) => {
      const user = loaders.rental.getUser.load(userId);

      return user;
    },

    book: async ({ bookId }, _, { loaders }) => {
      const book = loaders.rental.getBook.load(bookId);

      return book;
    },
  },

  Query: {
    getRentalHistory: async (_, { input }) => {
      const rental = await rentalService.getRentalHistory(input.rentalId);

      return { success: true, rental };
    },
  },

  Mutation: {
    createRentalStart: async (_, { input }) => {
      const rental = await rentalService.createRentalStart(input.userId, input);

      return { success: true, rental };
    },

    createRentalExtend: async (_, { input }, { ctx }) => {
      const { user } = ctx;

      const rental = await rentalService.createRentalExtend(user.id, input);

      return { success: true, rental };
    },

    createRentalEnd: async (_, { input }) => {
      const rental = await rentalService.createRentalEnd(input.userId, input);

      return { success: true, rental };
    },
  },
};

const resolversComposition = {
  'Query.getRentalHistory': [authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN], true)],
  'Mutation.createRentalStart': [authMiddleware([TABLE.USER_ROLE.ADMIN], true)],
  'Mutation.createRentalExtend': [authMiddleware([TABLE.USER_ROLE.USER], true)],
  'Mutation.createRentalEnd': [authMiddleware([TABLE.USER_ROLE.ADMIN], true)],
};

const composedRentalResolver = composeResolvers(rentalResolver, resolversComposition);

module.exports = composedRentalResolver;
