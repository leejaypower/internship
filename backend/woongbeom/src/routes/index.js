const Router = require('koa-router');

const bookRouter = require('./api/book');
const rentalRouter = require('./api/rental');

const router = new Router();

router.use('/books', bookRouter.routes());
router.use('/rentals', rentalRouter.routes());

module.exports = router;
