const { bookCategoryService } = require('../services');
const { errorHandling } = require('../common/util');

const getAll = async (ctx) => {
  try {
    const result = await bookCategoryService.getAll();

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

    const categoryId = Number(params.category_id);

    if (Number.isNaN(categoryId)) {
      errorHandling.throwError(400, 'PATH 정보를 확인해주세요.');
    }

    const result = await bookCategoryService.getById(categoryId);

    ctx.body = result;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const createBookCategory = async (ctx) => {
  try {
    const {
      koreanDecimalClassificationCode,
      name,
    } = ctx.request.body;

    if (!koreanDecimalClassificationCode || !name) {
      errorHandling.throwError(400, '필수 입력요소가 누락되었습니다.');
    }

    await bookCategoryService.createBookCategory({
      koreanDecimalClassificationCode,
      name,
    });

    ctx.status = 201;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

const deleteBookCategory = async (ctx) => {
  try {
    const { params } = ctx.request;

    const categoryId = params.category_id;

    await bookCategoryService.deleteBookCategory(categoryId);

    ctx.status = 204;
  } catch (err) {
    console.log(err.message);
    ctx.throw(err.name, err.message);
  }
};

module.exports = {
  getAll,
  getById,
  createBookCategory,
  deleteBookCategory,
};
