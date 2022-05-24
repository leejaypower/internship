const Router = require('koa-router');

const router = new Router();

const userRouter = require('./user');
const bookRouter = require('./book');
const rentalRouter = require('./rental');

router.use('/books', bookRouter.routes());

router.use('/rentals', rentalRouter.routes());

router.use('/users', userRouter.routes());

module.exports = router;
