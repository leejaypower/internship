// Controller 역할
// status code 및 res return

const { bookService } = require('../services');

const createBook = async (ctx) => {
  const book = await bookService.createBook(ctx.request.body);
  ctx.body = book;
};

module.exports = {
  createBook,
};
