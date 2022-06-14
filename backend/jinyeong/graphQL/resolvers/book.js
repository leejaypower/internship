/* eslint-disable no-unused-vars */
const { DateResolver } = require('graphql-scalars');
const { bookService } = require('../services');
const { userAuth, adminAuth } = require('./auth');

const bookResolvers = {
  Query: {
    books: async (parent, args, context) => {
      const books = await bookService.getAll();
      return books;
    },
    book: async (parent, args, context) => {
      const { id } = args;

      await userAuth(context);

      const book = await bookService.getById(id);
      return book;
    },
  },
  Mutation: {
    addBook: async (parent, args, context) => {
      const { bookInfoId } = args;

      await adminAuth(context);

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
    bookInfo: async (parent, args, context) => {
      const { bookInfoId } = parent;

      const bookInfo = await context.loaders.bookInfoLoader.load(bookInfoId);
      return bookInfo;
    },
    createdAt: DateResolver,
    updatedAt: DateResolver,
  },
  BookInfo: {
    category: async (parent, args, context) => {
      const { categoryId } = parent;

      const category = await context.loaders.bookCategoryLoader.load(categoryId);
      return category;
    },
    createdAt: DateResolver,
    updatedAt: DateResolver,
  },
  BookCategory: {
    createdAt: DateResolver,
    updatedAt: DateResolver,
  },
};

module.exports = bookResolvers;
