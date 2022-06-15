const Router = require('koa-router');

const {
  userRouter, bookRouter, rentalRouter,
} = require('./api');

const router = new Router();

router.use('', userRouter.routes());
router.use('', bookRouter.routes());
router.use('', rentalRouter.routes());

module.exports = router;
