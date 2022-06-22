const { rentalGraphController, bookGraphController } = require('../controller');

const rentalResolver = {

  Rental: {
    bookSerial: async (parent, _args, _context) => ({ id: parent.bookId }),

    book: async (parent, __args, _context) => {
      const { bookId: serialId } = parent;
      const book = await bookGraphController.getBookBySerialId(parent, { serialId }, _);
      return book;
    },
  },

  Query: {
    getAllRental: async (parent, { limit = 5, afterCursor }, context) => {
      const rentalList = await rentalGraphController.getAllRental(parent, { limit, afterCursor }, context);
      return rentalList;
    },

    getRentalByUserId: async (parent, { input }, context) => {
      const { rentalList } = await rentalGraphController.getRentalByUserId(parent, { input }, context);
      return rentalList;
    },

  },

  Mutation: {
    createRental: async (parent, { rentalInfo }, context) => {
      const data = await rentalGraphController.createRental(parent, { rentalInfo }, context);
      return data;
    },

    extendRentDate: async (parent, { rentalInfo }, context) => {
      const data = await rentalGraphController.extendRentDate(parent, { rentalInfo }, context);
      return data;
    },

    returnRentalBook: async (parent, { input }, context) => {
      const data = await rentalGraphController.returnRentalBook(parent, { input }, context);
      return data;
    },
  },
};
module.exports = rentalResolver;
