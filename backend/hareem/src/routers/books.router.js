const Router = require('@koa/router');
const booksController = require('../controllers/book.controller');

const bookRouter = new Router({
  prefix: '/book',
});

bookRouter.get('/list', booksController.getBooks);
bookRouter.get('/:id', booksController.getBook);
bookRouter.post('/', booksController.createBook);
bookRouter.patch('/:id', booksController.updateBook);
bookRouter.delete('/:id', booksController.deleteBook);

module.exports = bookRouter;
