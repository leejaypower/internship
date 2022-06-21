/* eslint-disable no-unused-vars */
const { rentalService } = require('../services');
const { userAuth, adminAuth } = require('./auth');

const rentalResolvers = {
  Query: {
    rental: async (parent, args, context) => {
      const { id } = args;

      await userAuth(context);

      const rentalInfo = await rentalService.getOneById(id);
      return rentalInfo;
    },
    rentals: async (parent, args, context) => {
      await adminAuth(context);

      const rentalInfoList = await rentalService.getAll();
      return rentalInfoList;
    },
  },
  Rental: {
    user: async (parent, args, context) => {
      const { userId } = parent;

      const userInfo = context.loaders.userLoader.load(userId);
      return userInfo;
    },
    book: async (parent, args, context) => {
      const { bookId } = parent;

      const book = context.loaders.bookLoader.load(bookId);
      return book;
    },
  },
};

module.exports = rentalResolvers;
