const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const booksRouter = new Router();

booksRouter.post('/', middleware.auth.authorization.authorizeAdmin, controller.books.createBook);
booksRouter.get('/', controller.books.getListAll);

module.exports = booksRouter;
