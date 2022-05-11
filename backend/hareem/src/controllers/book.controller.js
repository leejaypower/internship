const { createBookDto, updateBookDto } = require('../dtos/book.dtos');
const { bookService } = require('../services');

// Controller 역할
// data 검증 (dto logic)
// status code 및 res return

const bookController = {
  async getBooks(ctx) {
    ctx.body = await bookService.getBooks();
  },
  async getBook(ctx) {
    const { id } = ctx.params;
    ctx.body = await bookService.getBook(id);
  },
  async createBook(ctx) {
    const bookData = createBookDto({ ...ctx.request.body });
    ctx.body = await bookService.createBook(bookData);
  },
  async updateBook(ctx) {
    const { id } = ctx.params;
    const bookData = updateBookDto({ ...ctx.request.body });
    ctx.body = await bookService.updateBook(id, bookData);
  },
  async deleteBook(ctx) {
    const { id } = ctx.params;
    ctx.body = await bookService.deleteBook(id);
  },
};

module.exports = bookController;
