const { bookService } = require('../services');
const { util, constants } = require('../common');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async (ctx) => {
  const result = await bookService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = result;
};

const getById = async (ctx) => {
  const { params } = ctx.request;

  const bookId = Number(params.book_id);

  if (Number.isNaN(bookId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await bookService.getById(bookId);

  ctx.body = result;
};

const createBook = async (ctx) => {
  const {
    body,
  } = ctx.request;

  const { bookInfoId } = body;

  if (!bookInfoId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  await bookService.createBook({ bookInfoId });

  ctx.status = 201;
};

const updateBook = async (ctx) => {
  const { params, body } = ctx.request;

  const bookId = params.book_id;
  const { bookInfoId } = body;

  if (!bookInfoId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  await bookService.updateBook(bookId, { bookInfoId });

  ctx.status = 200;
};

const deleteBook = async (ctx) => {
  const { params } = ctx.request;

  const bookId = params.book_id;

  await bookService.deleteBook(bookId);

  ctx.status = 204;
};

module.exports = {
  getAll,
  getById,
  createBook,
  updateBook,
  deleteBook,
};
