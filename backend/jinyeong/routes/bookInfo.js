const Router = require('koa-router');

const bookInfoRouter = new Router();

const { bookInfoApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
bookInfoRouter.get('/', auth.userAuth, bookInfoApi.getAll);
bookInfoRouter.get('/:bookInfo_id', auth.userAuth, bookInfoApi.getById);

// POST 메소드
bookInfoRouter.post('/', auth.adminAuth, bookInfoApi.createBookInfo);

// PATCH 메소드
bookInfoRouter.patch('/:bookInfo_id', auth.adminAuth, bookInfoApi.updateBookInfo);

// DELETE 메소드
bookInfoRouter.delete('/:bookInfo_id', auth.adminAuth, bookInfoApi.deleteBookInfo);

module.exports = bookInfoRouter;
