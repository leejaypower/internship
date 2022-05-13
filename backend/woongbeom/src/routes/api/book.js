const Router = require('koa-router');

const booksController = require('../../controller');

const booksRouter = new Router();

booksRouter.post('/', booksController.createBook);
booksRouter.get('/', booksController.getListAll);

module.exports = booksRouter;
