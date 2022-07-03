const service = require('../service');
const lib = require('../lib');

const { CustomError } = lib.error.customError;
const { errorCode } = lib.error.errorCode;

const createBook = async (ctx) => {
  if (!ctx.request.body.title
    || !ctx.request.body.author
    || !ctx.request.body.publisher
    || !ctx.request.body.page) {
    throw new CustomError(errorCode.requiredInputNotNull, '[src/controller/book.js]');
  }
  if (typeof (ctx.request.body.title) !== 'string'
  || typeof (ctx.request.body.author) !== 'string'
  || typeof (ctx.request.body.publisher) !== 'string'
  || typeof (ctx.request.body.page) !== 'number') {
    throw new CustomError(errorCode.invalidInputType, '[src/controller/book.js]');
  }
  ctx.body = await service.book.createBook(ctx.request.body);
};

const getBooks = async (ctx) => {
  ctx.body = await service.book.getBooks(ctx.request.query);
};

const getBookById = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await service.book.getBookById(id);
};

const getBooksWithRentalHistory = async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await service.book.getBooksWithRentalHistory(id);
};

const updateBook = async (ctx) => {
  const { id } = ctx.params;
  if (ctx.request.body.page) {
    if (typeof (ctx.request.body.page) !== 'number') {
      throw new CustomError(errorCode.invalidInputType, '[src/controller/book.js]');
    }
  }
  if (ctx.request.body.statusCode) {
    if (typeof (ctx.request.body.statusCode) !== 'number') {
      throw new CustomError(errorCode.invalidInputType, '[src/controller/book.js]');
    }
  }
  const numOfUpdatedRow = await service.book.updateBook(id, ctx.request.body);
  ctx.body = numOfUpdatedRow;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getBooksWithRentalHistory,
  updateBook,
};
