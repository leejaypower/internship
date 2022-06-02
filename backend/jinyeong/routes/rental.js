const Router = require('koa-router');
const { rentalApi } = require('../apis');

const rentalRouter = new Router();

// GET 요청
rentalRouter.get('/', rentalApi.get);

// POST 요청
rentalRouter.post('/', rentalApi.post);

// PATCH 요청
rentalRouter.patch('/:book_id', rentalApi.patchByBookId);

module.exports = rentalRouter;
