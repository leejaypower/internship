const Router = require('@koa/router');
const bookRouter = require('./bookRouter');

const rootRouter = new Router();

rootRouter.use('/books', bookRouter.routes());

module.exports = rootRouter;
