const Router = require('koa-router');

const bookCategoryRouter = new Router();

const { bookCategoryApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
bookCategoryRouter.get('/', auth.userAuth, bookCategoryApi.getAll);
bookCategoryRouter.get('/:category_id', auth.userAuth, bookCategoryApi.getById);

// POST 메소드
bookCategoryRouter.post('/', auth.adminAuth, bookCategoryApi.createBookCategory);

// DELETE 메소드
bookCategoryRouter.delete('/:category_id', auth.adminAuth, bookCategoryApi.deleteBookCategory);

module.exports = bookCategoryRouter;
