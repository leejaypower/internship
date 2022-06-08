/* eslint-disable no-unused-vars */
const { bookService } = require('../services');
const { dateScalar } = require('./customScalars');

const bookResolvers = {
  Query: {
    books: async (root, args, context) => {
      const books = await bookService.getAll();
      return books;
    },
    book: async (root, { id }, context) => {
      const book = await bookService.getById(id);
      return book;
    },
  },
  Mutation: {
    addBook: async (root, { bookInfoId }, context) => {
      const result = await bookService.createBook(bookInfoId);

      return {
        code: '201',
        success: true,
        message: '신규 도서가 추가되었습니다.',
        book: result,
      };
    },
  },
  Book: {
    bookInfo: async ({ bookInfoId }, args, context) => {
      const bookInfo = await context.loaders.bookInfoLoader.load(bookInfoId);
      return bookInfo;
    },
    createdAt: dateScalar,
    updatedAt: dateScalar,
  },
  BookInfo: {
    category: async ({ categoryId }, args, context) => {
      const category = await context.loaders.bookCategoryLoader.load(categoryId);
      return category;
    },
    createdAt: dateScalar,
    updatedAt: dateScalar,
  },
  BookCategory: {
    createdAt: dateScalar,
    updatedAt: dateScalar,
  },
};

module.exports = bookResolvers;
