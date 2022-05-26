const { bookService } = require('../services');

const createBookInfoWithBook = async (ctx) => {
  try {
    const book = await bookService.createBookInfoWithBook(ctx.request.body);
    ctx.body = book;
  } catch (error) {
    ctx.throw(error);
  }
};

const getBookInfos = async (ctx) => {
  try {
    const bookInfos = await bookService.getBookInfos(ctx.request.query);
    ctx.body = bookInfos;
  } catch (error) {
    ctx.throw(error);
  }
};

const getBookInfo = async (ctx) => {
  try {
    const { bookInfoId } = ctx.params;
    const bookInfo = await bookService.getBookInfo(bookInfoId);
    ctx.body = bookInfo;
  } catch (error) {
    ctx.throw(error);
  }
};

const updateBookInfo = async (ctx) => {
  try {
    const { bookInfoId } = ctx.params;
    const book = await bookService.updateBookInfo(bookInfoId, ctx.request.body);
    ctx.body = book;
  } catch (error) {
    ctx.throw(error);
  }
};

const deleteBook = async (ctx) => {
  try {
    const { id } = ctx.params;
    const book = await bookService.deleteBook(id);
    ctx.body = book;
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = {
  createBookInfoWithBook,
  getBookInfos,
  getBookInfo,
  updateBookInfo,
  deleteBook,
};
