const Router = require('koa-router');

const router = new Router();

const userRouter = require('./user');
const bookRouter = require('./book');
const rentalRouter = require('./rental');
const reservationRouter = require('./reservation');

router.use('/users', userRouter.routes());

router.use('/books', bookRouter.routes());

router.use('/rentals', rentalRouter.routes());

router.use('/reservations', reservationRouter.routes());

module.exports = router;
