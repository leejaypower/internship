const { graphqlBookController } = require('../../controller');

const bookResolver = {
  Query: {
    getOneBook: graphqlBookController.getOneBook,
    getBookInfoList: graphqlBookController.getBookInfoList,
  },
  Mutation: {
    createBook: graphqlBookController.createBook,
    deleteBook: graphqlBookController.deleteBook,
  },

  BookInfo: {
    books: async (parent, _, context) => {
      const bookList = await context.loaders.bookLoader.load(parent.id);
      return bookList;
    },
    category: async (parent, _, context) => {
      const category = await context.loaders.categoryLoader.load(parent.categoryId);
      return category;
    },
  },
  Book: {
    bookInfo: async (parent, _, context) => {
      const bookInfo = context.loaders.bookInfoLoader.load(parent.bookInfoId);
      return bookInfo;
    },
  },
};

module.exports = { bookResolver };
