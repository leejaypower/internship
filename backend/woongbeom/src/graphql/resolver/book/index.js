const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const controller = require('../../../controller/graphql');
const middleware = require('../auth');

const book = {
  Query: {
    getBooks: async (_, bookQuery) => {
      const result = await controller.book.getBooks(bookQuery);
      return result;
    },
    getBookById: async (_, args) => {
      const bookId = args.id;
      const result = await controller.book.getBookById(bookId);
      return [result];
    },
  },
  Mutation: {
    createBook: async (_, args) => {
      const inputValues = args.createBookInput;

      const result = await controller.book.createBook(inputValues);
      return [result];
    },
    updateBook: async (_, args) => {
      const updateBookId = args.updateBookInput.id;
      const inputValues = args.updateBookInput;

      const result = await controller.book.updateBook(updateBookId, inputValues);
      return result;
    },
  },
};

const resolveComposition = {
  'Mutation.*': [middleware.Query.isAuthenticatedAdmin()],
};
const composedResolvers = composeResolvers(book, resolveComposition);

module.exports = composedResolvers;

/**
 * Resolver 내 파라미터명 통일 (다른 리졸버도)
 * 파라미터 갯수에 대하여 고민
 */
