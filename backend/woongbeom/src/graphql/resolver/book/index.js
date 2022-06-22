const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const controller = require('../../../controller/graphql');
const middleware = require('../auth');
const loader = require('../../dataloader');

const book = {
  Query: {
    getBooks: async (parent, bookQuery) => {
      const result = await controller.book.getBooks(bookQuery);
      return result;
    },
    getBookById: async (_, args) => {
      const bookId = args.id;
      const result = await controller.book.getBookById(bookId);
      return [result];
    },
    getBooksAllByIds: async (parent, { ids }, context) => {
      const books = await controller.book.getBooksAllByIds(ids);
      return books;
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
  book: {
    rentalHistory: async (parent) => {
      const result = await loader.rentalLoader.load(parent.id);
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
 * ToDo
 * Resolver 내 파라미터명 통일 (다른 리졸버도)
 * 파라미터 갯수에 대하여 고민
 *
 * 기본 스키마(resolver)와 확장 스키마(dataloader) 분리
 * 리소스의 컬럼
 */
