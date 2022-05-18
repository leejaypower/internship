const Router = require('koa-router');

const controller = require('../../controller');

const booksRouter = new Router();

booksRouter.post('/', controller.books.createBook);
booksRouter.get('/', controller.books.getListAll);

module.exports = booksRouter;
