const Router = require('koa-router');

const bookInfoRouter = new Router();

const { bookInfoApi } = require('../apis');

// GET 메소드
bookInfoRouter.get('/', bookInfoApi.getAll);
bookInfoRouter.get('/:bookInfo_id', bookInfoApi.getById);

// POST 메소드
bookInfoRouter.post('/', bookInfoApi.createBookInfo);

// PATCH 메소드
bookInfoRouter.patch('/:bookInfo_id', bookInfoApi.updateBookInfo);

// DELETE 메소드
bookInfoRouter.delete('/:bookInfo_id', bookInfoApi.deleteBookInfo);

module.exports = bookInfoRouter;
