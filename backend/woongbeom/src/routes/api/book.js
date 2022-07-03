const Router = require('koa-router');

const controller = require('../../controller');
const lib = require('../../lib');
const middleware = require('../../middleware');

const booksRouter = new Router();

const { authorizeAdmin } = middleware.auth.authorization;
const { books } = controller;
const { logger } = lib.util;

booksRouter.post('/', logger.logRequest, authorizeAdmin, books.createBook);
booksRouter.get('/', logger.logRequest, books.getBooks);

booksRouter.get('/:id', logger.logRequest, books.getBookById);
booksRouter.get('/:id/histories', logger.logRequest, authorizeAdmin, books.getBooksWithRentalHistory);
booksRouter.patch('/:id', logger.logRequest, authorizeAdmin, books.updateBook);

module.exports = booksRouter;
