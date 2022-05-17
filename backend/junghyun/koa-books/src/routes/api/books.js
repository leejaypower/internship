const Router = require('koa-router');
const {
  bookController,
} = require('../../controllers');

const bookRouter = new Router();

bookRouter.post('/book', bookController.createBook);
bookRouter.get('/books', bookController.getBooks);
bookRouter.get('/book/:id', bookController.getBookById);
bookRouter.delete('/book/:id', bookController.deleteBook);

module.exports = bookRouter;
