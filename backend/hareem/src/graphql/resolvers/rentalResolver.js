const { rentalService } = require('../../services');

module.exports = {
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
      console.log(rental);

      return { success: true, rental };
    },

    createRentalExtend: async (_, { input }) => {
      const rental = await rentalService.createRentalExtend(input.userId, input);

      return { success: true, rental };
    },

    createRentalEnd: async (_, { input }) => {
      const rental = await rentalService.createRentalEnd(input.userId, input);

      return { success: true, rental };
    },
  },
};
