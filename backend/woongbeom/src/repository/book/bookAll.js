const db = require('../../db/models');

const booksAll = {
  async getBooksTable() {
    try {
      const getBooksAll = await db.Book.findAll();
      return getBooksAll;
    } catch (err) {
      throw new Error('Error Occrured attempting to read Books table');
    }
  },
};

module.exports = booksAll;
