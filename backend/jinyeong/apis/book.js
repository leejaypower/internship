const { bookService } = require('../services');
const { errorHandling } = require('../common/util');

// GET 메소드
const getAll = async (ctx) => {
  try {
    const result = await bookService.viewAll();

    if (result.length === 0) {
      ctx.status = 204;
    }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// GET:/book_id 메소드
const getById = async (ctx) => {
  try {
    const { params } = ctx.request;
    const bookId = params.book_id;

    const result = await bookService.viewDetail(bookId);

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// POST 메소드
const post = async (ctx) => {
  try {
    const {
      body,
    } = ctx.request;

    const {
      bookInfoId,
    } = body;

    if (!bookInfoId) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }

    await bookService.addNewBook({ bookInfoId });

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// PATCH 메소드
const patchById = async (ctx) => {
  try {
    const {
      params,
      body,
    } = ctx.request;

    const bookId = params.book_id;
    const {
      bookInfoId,
    } = body;

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

// DELETE 메소드
const deleteById = async (ctx) => {
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
  post,
  patchById,
  deleteById,
};
