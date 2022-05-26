const Router = require('@koa/router');

const bookRouter = new Router();
const { bookController } = require('../controller');

bookRouter.get('/', bookController.getBook);
bookRouter.get('/:bookId', bookController.getSingleBook);
bookRouter.post('/', bookController.createBook);
bookRouter.patch('/:bookId', bookController.updateBook);
bookRouter.delete('/', bookController.deleteBook);
bookRouter.delete('/:bookId', bookController.deleteBook);

module.exports = bookRouter;
