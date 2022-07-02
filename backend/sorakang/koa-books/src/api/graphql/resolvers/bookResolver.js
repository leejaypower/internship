const service = require('../../../services');
const { bookSerialLoader } = require('../dataLoader');

const bookResolver = {

  Book: {
    bookSerials: async (parent, _args, _context) => {
      const bookSerialList = await bookSerialLoader.load(parent.id);
      return bookSerialList;
    },
  },

  Query: {
    getAllBooks: async (parent, { limit = 5, afterCursor = `${new Date().getTime()}-1` }, context) => {
      // cursor 모듈화 진행할 것
      const cursorArray = afterCursor.split('-');
      const curCursor = new Date(Number(cursorArray[0]));
      const bookId = Number(cursorArray[1]);

      const bookList = service.graphql.book.getAllBooks(parent, { limit, curCursor, bookId }, context);

      return bookList;
    },

    getBooksById: async (parent, { bookIds }, _context) => {
      const bookList = await service.book.getBooksById(bookIds);
      return bookList;
    },

    getBookBySerialId: async (parent, { serialId }, _context) => {
      const book = await service.graphql.book.getBookBySerialId(serialId);
      return book;
    },
  },

  Mutation: {
    createBook: async (parent, { bookInfo }, _context) => {
      const data = await service.book.createBook(bookInfo);
      return data;
    },

    updateBook: async (parent, { updateInfo }, _context) => {
      const { bookId, ...bookInfo } = updateInfo;
      // update된 정보 같이 return하도록 수정하기
      await service.book.updateBook(bookId, bookInfo);
      return { message: 'Successfully updated' };
    },

    deleteBook: async (parent, { bookIdList }, _context) => {
      await service.graphql.book.deleteBook(bookIdList);
      return { message: 'Successfully deleted' };
    },
  },
};

module.exports = bookResolver;
