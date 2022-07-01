const { bookService } = require('../services');
const { errorHandling } = require('../common/util');

const getAll = async (ctx) => {
  try {
    const result = await bookService.getAll();

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const getById = async (ctx) => {
  try {
    const { params } = ctx.request;

    const bookId = Number(params.book_id);

    if (Number.isNaN(bookId)) {
      errorHandling.throwError(400, 'PATH 정보를 확인해주세요.');
    }

    const result = await bookService.getById(bookId);

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const createBook = async (ctx) => {
  try {
    const {
      body,
    } = ctx.request;

    const { bookInfoId } = body;

    if (!bookInfoId) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }

    await bookService.createBook({ bookInfoId });

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const updateBook = async (ctx) => {
  try {
    const { params, body } = ctx.request;

    const bookId = params.book_id;
    const { bookInfoId } = body;

    if (!bookInfoId) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }

    await bookService.updateBook(bookId, { bookInfoId });

    ctx.status = 200;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const deleteBook = async (ctx) => {
  try {
    const { params } = ctx.request;

    const bookId = params.book_id;

    await bookService.deleteBook(bookId);

    ctx.status = 204;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  getAll,
  getById,
  createBook,
  updateBook,
  deleteBook,
};
