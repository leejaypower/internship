const Router = require('koa-router');

const bookRouter = require('./api/book');
const rentalRouter = require('./api/rental');
const returnRouter = require('./api/returnBook');
const userRouter = require('./api/user');
const adminRouter = require('./api/admin');

const router = new Router();

router.use('/books', bookRouter.routes());
router.use('/rentals', rentalRouter.routes());
router.use('/returns', returnRouter.routes());
router.use('/users', userRouter.routes());
router.use('/admins', adminRouter.routes());

module.exports = router;
