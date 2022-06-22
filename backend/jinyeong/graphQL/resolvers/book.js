/* eslint-disable no-unused-vars */
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
      const { loaders } = context;

      const bookInfo = await loaders.bookInfoLoader.batchGetByIds.load(bookInfoId);
      return bookInfo;
    },
    rentals: async (parent, args, context) => {
      const bookId = parent.id;
      const { loaders } = context;

      await adminAuth(context);

      const rentalList = await loaders.rentalLoader.batchGetListByBookIds.load(bookId);
      return rentalList;
    },
  },
  BookInfo: {
    category: async (parent, args, context) => {
      const { categoryId } = parent;
      const { loaders } = context;

      const category = await loaders.bookCategoryLoader.batchGetByIds.load(categoryId);
      return category;
    },
  },
};

module.exports = bookResolvers;
