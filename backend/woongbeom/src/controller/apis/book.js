const service = require('../../service');
const { errorHandler } = require('../../../lib/util/error');

const createBook = async (ctx) => {
  try {
    if (!ctx.request.body.title
      || !ctx.request.body.author
      || !ctx.request.body.publisher
      || !ctx.request.body.page) {
      errorHandler(1, 'Book instance\'s element does not exist.');
    }
    if (typeof (ctx.request.body.title) !== 'string'
    || typeof (ctx.request.body.author) !== 'string'
    || typeof (ctx.request.body.publisher) !== 'string'
    || typeof (ctx.request.body.page) !== 'number') {
      errorHandler(1, 'Invalid type of book instance');
    }
    ctx.body = await service.book.createBook(ctx.request.body);
  } catch (err) {
    ctx.throw(err);
  }
};

const getBooks = async (ctx) => {
  try {
    ctx.body = await service.book.getBooks(ctx.request.query);
  } catch (err) {
    ctx.throw(err);
  }
};

const getBookById = async (ctx) => {
  try {
    const { id } = ctx.params;
    ctx.body = await service.book.getBookById(id);
  } catch (err) {
    ctx.throw(err);
  }
};

const getBooksWithRentalHistory = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await service.book.getBooksWithRentalHistory(id);
};

const updateBook = async (ctx) => {
  try {
    const { id } = ctx.params;
    // page, statusCode 인자가 들어왔는데 type이 Number가 아니라면 error
    if (ctx.request.body.page) {
      if (typeof (ctx.request.body.page) !== 'number') {
        errorHandler(1, 'invalid page datatype');
      }
    }
    if (ctx.request.body.statusCode) {
      if (typeof (ctx.request.body.statusCode) !== 'number') {
        errorHandler(1, 'invalid statusCode datatype');
      }
    }
    const numOfUpdatedRow = await service.book.updateBook(id, ctx.request.body);
    ctx.body = numOfUpdatedRow;
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getBooksWithRentalHistory,
  updateBook,
};
