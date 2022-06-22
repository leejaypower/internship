/* eslint-disable no-unused-vars */
const { reservationService } = require('../services');
const { userAuth, adminAuth } = require('./auth');

const reservationResolvers = {
  Query: {
    reservation: async (parent, args, context) => {
      const { id } = args;

      await userAuth(context);

      const reservationInfo = await reservationService.getOneById(id);
      return reservationInfo;
    },
    reservations: async (parent, args, context) => {
      await adminAuth(context);

      const reservationInfoList = await reservationService.getAll();
      return reservationInfoList;
    },
  },
  Reservation: {
    user: async (parent, args, context) => {
      const { userId } = parent;
      const { loaders } = context;

      await adminAuth(context);

      const userInfo = loaders.userLoader.batchGetByIds.load(userId);
      return userInfo;
    },
    book: async (parent, args, context) => {
      const { bookId } = parent;
      const { loaders } = context;

      await adminAuth(context);

      const book = loaders.bookLoader.batchGetByIds.load(bookId);
      return book;
    },
  },
};

module.exports = reservationResolvers;
