const Router = require('koa-router');

const bookRouter = require('./api/book');

const router = new Router();

router.use('/books', bookRouter.routes());

module.exports = router;
