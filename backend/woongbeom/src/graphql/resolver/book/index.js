const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const service = require('../../../service');
const loader = require('../../dataloader');
const auth = require('../auth');

const book = {
  Query: {
    getBooks: async (parent, args) => {
      const bookQuery = args;
      const result = await service.book.getBooks(bookQuery);
      return result;
    },
    getBookById: async (_, args) => {
      const bookId = args.id;
      const result = await service.book.getBookById(bookId);
      return result;
    },
    getBooksAllByIds: async (parent, args) => {
      const { ids } = args;
      const books = await service.book.getBooksAllByIds(ids);
      return books;
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const inputValues = args.createBookInput;

      const result = await service.book.createBook(inputValues);
      return result;
    },
    updateBook: async (parent, args) => {
      const updateBookId = args.updateBookInput.id;
      const inputValues = args.updateBookInput;

      const result = await service.book.updateBook(updateBookId, inputValues);
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
  'Mutation.*': [auth.admin()],
};

const composedResolvers = composeResolvers(book, resolveComposition);

module.exports = composedResolvers;

/**
 * ToDo
 * 기본 스키마(resolver)와 확장 스키마(dataloader) 분리
 * 리소스의 컬럼
 */
