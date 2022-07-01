const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const booksRouter = new Router();

const { authorizeAdmin } = middleware.auth.authorization;
const { books } = controller;

booksRouter.post('/', authorizeAdmin, books.createBook);
booksRouter.get('/', books.getBooks);

booksRouter.get('/:id', books.getBookById);
booksRouter.get('/:id/histories', authorizeAdmin, books.getBooksWithRentalHistory);
booksRouter.patch('/:id', authorizeAdmin, books.updateBook);

module.exports = booksRouter;
