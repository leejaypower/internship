const service = require('../../../services');

const rentalResolver = {

  Rental: {
    bookSerial: async (parent, _args, _context) => ({ id: parent.bookId }),

    book: async (parent, __args, _context) => {
      const { bookId: serialId } = parent;
      const book = await service.graphql.book.getBookBySerialId(serialId);
      return book;
    },
  },

  Query: {
    getAllRental: async (parent, { limit = 5, afterCursor }, _context) => {
      const rentalList = await service.graphql.rental.getAllRental({ limit, afterCursor });
      return rentalList;
    },

    getRentalByUserId: async (parent, { input }, context) => {
      // 만약 uer의 role이 admin이라면 body의 id사용 아니라면 context user id 사용
      const userId = context.code === 'ADMIN' ? input.userId : context.user.id;
      const { rentalList } = await service.rental.getRentalInfo({ userId });
      return rentalList;
    },
  },

  Mutation: {
    createRental: async (parent, { rentalInfo }, context) => {
      const { bookSerialId } = rentalInfo;
      const userId = context.code === 'ADMIN' ? rentalInfo.userId : context.user.id;

      const { rentInfo } = await service.graphql.rental.createRental({ userId, bookSerialId });

      return { message: 'Successfully created', data: rentInfo };
    },

    extendRentDate: async (parent, { rentalInfo }, _context) => {
      const { rentalId, bookSerialId } = rentalInfo;
      const { updatedCount } = await service.rental.extendRentDate(bookSerialId, rentalId);
      if (!updatedCount) {
        return { message: 'Extend failed' };
      }
      return { message: 'Successfully Extended' };
    },

    returnRentalBook: async (parent, { input }, _context) => {
      const { rentalId, bookSerialId } = input;
      const { rentalUpdatedCount, rentHistory } = await service.graphql.rental.returnRentalBook({ rentalId, bookSerialId });
      return { data: rentHistory.dataValues, message: { message: 'Successfully returned' } };
    },
  },
};
module.exports = rentalResolver;
