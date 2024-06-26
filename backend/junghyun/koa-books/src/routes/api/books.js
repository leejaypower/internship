const Router = require('koa-router');
const { bookController } = require('../../controllers/restAPI');
const { adminAuthorized } = require('../../common/auth');

const bookRouter = new Router();

// Admin
bookRouter.post('/book', adminAuthorized, bookController.createBook);
bookRouter.delete('/book/:id', adminAuthorized, bookController.deleteBook);

// All
bookRouter.get('/books', bookController.getBooks);
bookRouter.get('/book/:id', bookController.getOneBook);

module.exports = bookRouter;
