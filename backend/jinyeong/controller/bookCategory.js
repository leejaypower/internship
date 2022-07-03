const { bookCategoryService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { CustomError } = util.errorHandler;
const { ERROR_CODE } = constants;

const getAll = async (ctx) => {
  const result = await bookCategoryService.getAll();

  if (result.length === 0) {
    ctx.status = 204;
  }

  ctx.body = restApiResponse(200, result);
};

const getById = async (ctx) => {
  const { params } = ctx.request;

  const categoryId = Number(params.category_id);

  if (Number.isNaN(categoryId)) {
    throw new CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await bookCategoryService.getById(categoryId);

  ctx.body = restApiResponse(200, result);
};

const createBookCategory = async (ctx) => {
  const {
    koreanDecimalClassificationCode,
    name,
  } = ctx.request.body;

  if (!koreanDecimalClassificationCode || !name) {
    throw new CustomError(ERROR_CODE.REQUIRED_INPUT_NULL);
  }

  const result = await bookCategoryService.createBookCategory({
    koreanDecimalClassificationCode,
    name,
  });

  ctx.body = restApiResponse(201, result);
  ctx.status = 201;
};

const deleteBookCategory = async (ctx) => {
  const { params } = ctx.request;

  const categoryId = params.category_id;

  await bookCategoryService.deleteBookCategory(categoryId);

  ctx.status = 204;
};

module.exports = {
  getAll,
  getById,
  createBookCategory,
  deleteBookCategory,
};
