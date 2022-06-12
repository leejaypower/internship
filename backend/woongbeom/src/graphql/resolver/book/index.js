const controller = require('../../../controller/graphql');

const book = {
  Query: {
    books: async () => {
      const result = await controller.book.getListAll();
      return result;
    },
  },
  Mutation: {},
};

module.exports = book;
