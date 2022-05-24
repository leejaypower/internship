const { bookService } = require('../services');
const { errorHandling } = require('../common/util');

// GET 메소드
const getAll = async (ctx) => {
  try {
    const result = await bookService.viewAll();

    if (result.length === 0) { ctx.status = 204; }

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// GET 메소드
const getByQuery = async (ctx) => {
  try {
    const { query } = ctx.request;
    const { name, category } = query;

    const inputData = { name, category }; // 요청가능한 쿼리만 추출

    const queryResult = await bookService.viewByQuery(inputData);

    if (queryResult.length === 0) {
      ctx.status = 204;
    }

    ctx.body = queryResult;
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
    const { body } = ctx.request;

    await bookService.addNewBook(body);

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

// PATCH 메소드
const patchById = async (ctx) => {
  try {
    const { params, body } = ctx.request;
    const bookId = params.book_id;

    // inputData가 없을 시
    if (Object.keys(body).length === 0) {
      errorHandling.throwError(400, '변경내용이 입력되지 않았습니다.');
    }

    await bookService.updateBook(bookId, body);

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
  getByQuery,
  getById,
  post,
  patchById,
  deleteById,
};
