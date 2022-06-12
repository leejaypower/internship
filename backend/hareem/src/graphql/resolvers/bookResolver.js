const { bookService } = require('../../services');

module.exports = {
  Book: {
    bookInfo: async ({ bookInfoId }, _, { loaders }) => {
      const bookInfo = loaders.book.getBookInfo.load(bookInfoId);
      return bookInfo;
    },
  },

  BookInfo: {
    books: async ({ id: bookInfoId }, _, { loaders }) => {
      const books = loaders.book.getBooks.load(bookInfoId);
      return books;
    },
  },

  Query: {
    getBookInfosWithBooks: async (_, { input }) => {
      const bookInfos = await bookService.getBookInfos({ ...input, only: true });
      return { success: true, bookInfos };
    },
  },

  Mutation: {
    createBook: async (_, { input }) => {
      const book = await bookService.createBookInfoWithBookGql(input);
      return { success: true, book };
    },

    updateBookInfo: async (_, { input }) => {
      const { id: bookInfoId } = input;
      const bookInfo = await bookService.updateBookInfo(bookInfoId, { ...input, only: true });
      return { success: true, bookInfo };
    },

    deleteBook: async (_, { input }) => {
      const { id: bookId } = input;
      const result = await bookService.deleteBook(bookId);
      return { success: true, result };
    },
  },
};
