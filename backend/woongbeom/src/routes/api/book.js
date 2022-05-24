const Router = require('koa-router');

const controller = require('../../controller');
const auth = require('../../middleware/auth');

const booksRouter = new Router();

booksRouter.post('/', auth.auth.authorizeAdmin, controller.books.createBook);
booksRouter.get('/', controller.books.getListAll);

module.exports = booksRouter;
