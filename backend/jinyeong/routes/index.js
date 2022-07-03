const Router = require('koa-router');

const router = new Router();

const adminRouter = require('./admin');
const userRouter = require('./user');
const mypageRouter = require('./mypage');
const bookRouter = require('./book');
const bookInfoRouter = require('./bookInfo');
const bookCategoryRouter = require('./bookCategory');
const rentalRouter = require('./rental');
const reservationRouter = require('./reservation');

router.use('/admins', adminRouter.routes());
router.use('/users', userRouter.routes());
router.use('/mypage', mypageRouter.routes());
router.use('/books', bookRouter.routes());
router.use('/bookInfo', bookInfoRouter.routes());
router.use('/bookCategories', bookCategoryRouter.routes());
router.use('/rentals', rentalRouter.routes());
router.use('/reservations', reservationRouter.routes());

module.exports = router;
