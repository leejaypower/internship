const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const booksRouter = new Router();

booksRouter.post('/', middleware.auth.authorization.authorizeAdmin, controller.apis.books.createBook);
booksRouter.get('/', controller.apis.books.getBooks);
booksRouter.get('/:id', controller.apis.books.getBookById);
booksRouter.patch('/:id', middleware.auth.authorization.authorizeAdmin, controller.apis.books.updateBook);

module.exports = booksRouter;
