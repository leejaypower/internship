const Router = require('koa-router');

const rentalRouter = new Router();

const { rentalApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
rentalRouter.get('/', auth.userAuth, rentalApi.getAll);
rentalRouter.get('/user/:user_id?', auth.userAuth, rentalApi.searchByUserId);
rentalRouter.get('/book/:book_id?', auth.userAuth, rentalApi.searchByBookId);

// POST 메소드
rentalRouter.post('/', auth.adminAuth, rentalApi.createRental);

// UPDATE 메소드
rentalRouter.patch('/book/:book_id', auth.adminAuth, rentalApi.updateRental);

module.exports = rentalRouter;
