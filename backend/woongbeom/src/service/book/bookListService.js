const bookRepository = require('../../repository/book/index');

const bookListService = {
  async getBooksTable() {
    const result = await bookRepository.getBooksTable();
    return result;
  },
};

module.exports = bookListService;
