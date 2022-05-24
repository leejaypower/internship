const Router = require('koa-router');
const userRouter = require('./user');

const router = new Router();

router.use('/users', userRouter.routes());

module.exports = router;
