const Router = require('koa-router');
const { rentalApi } = require('../controller');

const rentalRouter = new Router();

// GET 메소드
rentalRouter.get('/', rentalApi.getAll);
rentalRouter.get('/user/:user_id?', rentalApi.searchByUserId);
rentalRouter.get('/book/:book_id?', rentalApi.searchByBookId);

// POST 메소드
rentalRouter.post('/', rentalApi.createRental);

// UPDATE 메소드
rentalRouter.patch('/book/:book_id', rentalApi.updateRental);

module.exports = rentalRouter;
