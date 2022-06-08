const Router = require('@koa/router');

const rootRouter = new Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const rentalRouter = require('./rentalRouter');
const reserveRouter = require('./reserveRouter');
const bookRouter = require('./bookRouter');

rootRouter.use('/users', userRouter.routes());
rootRouter.use('/auth', authRouter.routes());
rootRouter.use('/rentals', rentalRouter.routes());
rootRouter.use('/reservation', reserveRouter.routes());
rootRouter.use('/books', bookRouter.routes());

module.exports = rootRouter;
