const Router = require('@koa/router');
const bookRouter = require('./bookRouter');
const rentalRouter = require('./rentalRouter');
const userRouter = require('./userRouter');
const reservationRouter = require('./reservationRouter');

const router = new Router();

router.use('/users', userRouter.routes());
router.use('/books', bookRouter.routes());
router.use('/rental', rentalRouter.routes());
router.use('/reservation', reservationRouter.routes());

module.exports = router;
