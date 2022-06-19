const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const booksRouter = new Router();

booksRouter.post('/', middleware.auth.authorization.authorizeAdmin, controller.books.createBook);
booksRouter.get('/', controller.books.getBooks);
booksRouter.get('/:id', controller.books.getBookById);
booksRouter.patch('/:id', middleware.auth.authorization.authorizeAdmin, controller.books.updateBook);


module.exports = booksRouter;
