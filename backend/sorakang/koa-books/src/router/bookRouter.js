const Router = require('@koa/router');
const { authMiddleware } = require('../middleware');

const bookRouter = new Router();
const { bookController } = require('../controller');

bookRouter.get('/', bookController.getAllBook);
bookRouter.get('/:bookId', bookController.getSingleBook);
bookRouter.post('/', authMiddleware.verifyToken('admin'), bookController.createBook);
bookRouter.patch('/:bookId', authMiddleware.verifyToken('admin'), bookController.updateBook);
bookRouter.delete('/', authMiddleware.verifyToken('admin'), bookController.deleteBook);
bookRouter.delete('/:bookId', authMiddleware.verifyToken('admin'), bookController.deleteSingleBook);

module.exports = bookRouter;
