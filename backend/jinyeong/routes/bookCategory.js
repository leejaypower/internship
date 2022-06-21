const Router = require('koa-router');

const bookCategoryRouter = new Router();

const { bookCategoryApi } = require('../apis');

// GET 메소드
bookCategoryRouter.get('/', bookCategoryApi.getAll);
bookCategoryRouter.get('/:category_id', bookCategoryApi.getById);

// POST 메소드
bookCategoryRouter.post('/', bookCategoryApi.createBookCategory);

// DELETE 메소드
bookCategoryRouter.delete('/:category_id', bookCategoryApi.deleteBookCategory);

module.exports = bookCategoryRouter;
