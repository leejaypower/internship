const { bookInfoService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async (ctx) => {
  const result = await bookInfoService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

const getById = async (ctx) => {
  const { params } = ctx.request;

  const bookInfoId = params.bookInfo_id;

  const result = await bookInfoService.getById(bookInfoId);

  ctx.body = restApiResponse(200, result);
};

const createBookInfo = async (ctx) => {
  const { body } = ctx.request;

  const {
    name,
    categoryId,
    author,
    publisher,
    description,
  } = body;

  if (!name || !categoryId || !author || !publisher || !description) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const result = await bookInfoService.createBookInfo({
    name,
    categoryId,
    author,
    publisher,
    description,
  });

  ctx.body = restApiResponse(201, result);
  ctx.status = 201;
};

const updateBookInfo = async (ctx) => {
  const { params, body } = ctx.request;

  const bookInfoId = params.bookInfo_id;
  const {
    name,
    categoryId,
    author,
    publisher,
    discription,
  } = body;

  await bookInfoService.updateBookInfo(bookInfoId, {
    name,
    categoryId,
    author,
    publisher,
    discription,
  });

  ctx.body = restApiResponse(200, '업데이트 되었습니다!');
};

const deleteBookInfo = async (ctx) => {
  const { params } = ctx.request;

  const bookInfoId = params.bookInfo_id;

  await bookInfoService.deleteBookInfo(bookInfoId);

  ctx.status = 204;
};

module.exports = {
  getAll,
  getById,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
};
