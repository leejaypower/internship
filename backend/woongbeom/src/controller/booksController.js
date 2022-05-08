const bookListService = require('../service/book/bookListService');

const booksController = {
  async getBooksTable(ctx) {
    ctx.body = await bookListService.getBooksTable();
  },
};

module.exports = booksController;
