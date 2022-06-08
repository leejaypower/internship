const { bookSerialLoader } = require('./loader');
const { bookGraphController } = require('../controller');

const bookResolver = {
  Query: {
    getBooksById: async (parent, { bookIds }, context) => {
      const getBooks = await bookGraphController.getBooksById(parent, { bookIds }, context);
      const result = getBooks.map(async (book) => {
        book.bookSerial = await bookSerialLoader.load(book.id);
        return book;
      });
      return result;
    },
  },
};

module.exports = bookResolver;
