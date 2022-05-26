const Router = require('@koa/router');

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const bookRouter = require('./bookRouter');

const rootRouter = new Router();

rootRouter.use('/users', userRouter.routes());
rootRouter.use('/auth', authRouter.routes());
rootRouter.use('/books', bookRouter.routes());

module.exports = rootRouter;
