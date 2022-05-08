const Router = require('koa-router');

const bookRouter = require('./api/books');

const router = new Router();

router.use('/books', bookRouter.routes());

module.exports = router;
