const { bookSerialLoader } = require('../dataLoader');
const { bookGraphController } = require('../controller');

const bookResolver = {

  Book: {
    bookSerials: async (parent, _, _context) => {
      const bookSerialList = await bookSerialLoader.load(parent.id);
      return bookSerialList;
    },
  },

  Query: {
    getAllBooks: async (parent, { limit = 5, afterCursor }, context) => {
      const data = bookGraphController.getAllBooks(parent, { limit, afterCursor }, context);
      return data;
    },

    getBooksById: async (parent, { bookIds }, context) => {
      const bookList = bookGraphController.getBooksById(parent, { bookIds }, context);
      return bookList;
    },

    getBookBySerialId: async (parent, { serialId }, context) => {
      const book = bookGraphController.getBookBySerialId(parent, { serialId }, context);
      return book;
    },
  },

  Mutation: {
    createBook: async (parent, { bookInfo }, context) => {
      const data = await bookGraphController.createBook(parent, { bookInfo }, context);
      return data;
    },
    updateBook: async (parent, { updateInfo }, context) => {
      const data = await bookGraphController.updateBook(parent, { updateInfo }, context);
      return data;
    },

    deleteBook: async (parent, { bookIdList }, context) => {
      const data = await bookGraphController.deleteBook(parent, { bookIdList }, context);
      return data;
    },

  },
};

module.exports = bookResolver;
