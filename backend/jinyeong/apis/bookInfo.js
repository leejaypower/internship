const { bookInfoService } = require('../services');
const { errorHandling } = require('../common/util');

const getAll = async (ctx) => {
  try {
    const result = await bookInfoService.getAll();

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
    const {
      params,
    } = ctx.request;

    const bookInfoId = params.bookInfo_id;

    const result = await bookInfoService.getById(bookInfoId);

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const createBookInfo = async (ctx) => {
  try {
    const {
      body,
    } = ctx.request;

    const {
      name,
      categoryId,
      author,
      publisher,
      discription,
    } = body;

    if (!name || !categoryId || !author || !publisher || !discription) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }

    await bookInfoService.createBookInfo({
      name,
      categoryId,
      author,
      publisher,
      discription,
    });

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const updateBookInfo = async (ctx) => {
  try {
    const {
      params,
      body,
    } = ctx.request;

    const {
      name,
      categoryId,
      author,
      publisher,
      discription,
    } = body;

    const bookInfoId = params.bookInfo_id;

    await bookInfoService.updateBookInfo(bookInfoId, {
      name,
      categoryId,
      author,
      publisher,
      discription,
    });

    ctx.status = 200;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const deleteBookInfo = async (ctx) => {
  try {
    const {
      params,
    } = ctx.request;

    const bookInfoId = params.bookInfo_id;

    await bookInfoService.deleteBookInfo(bookInfoId);

    ctx.status = 204;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  getAll,
  getById,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
};
