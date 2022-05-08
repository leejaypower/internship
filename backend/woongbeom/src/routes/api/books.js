const Router = require('koa-router');

const booksController = require('../../controller');

const booksRouter = new Router();

booksRouter.get('/', booksController.getBooksTable);

module.exports = booksRouter;
