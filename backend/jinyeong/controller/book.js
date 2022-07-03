const { bookService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async (ctx) => {
  const result = await bookService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

const getById = async (ctx) => {
  const { params } = ctx.request;

  const bookId = Number(params.book_id);

  if (Number.isNaN(bookId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await bookService.getById(bookId);

  ctx.body = restApiResponse(200, result);
};

const createBook = async (ctx) => {
  const {
    body,
  } = ctx.request;

  const { bookInfoId } = body;

  if (!bookInfoId) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const result = await bookService.createBook({ bookInfoId });

  ctx.body = restApiResponse(201, result);
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

  ctx.body = restApiResponse(200, '업데이트 되었습니다!');
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
