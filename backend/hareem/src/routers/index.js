const Router = require('@koa/router');
const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');

const router = new Router();

router.use('/users', userRouter.routes());
router.use('/books', bookRouter.routes());

module.exports = router;
