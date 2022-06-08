const Router = require('@koa/router');
const { authMiddleware } = require('../../../middleware');

const bookRouter = new Router();
const { bookController } = require('../controller');
const { ROLES } = require('../../../utils/constant');

bookRouter.get('/', bookController.getAllBook);
bookRouter.get('/:bookId', bookController.getSingleBook);
bookRouter.post('/', authMiddleware.verifyToken(ROLES.ADMIN), bookController.createBook);
bookRouter.patch('/:bookId', authMiddleware.verifyToken(ROLES.ADMIN), bookController.updateBook);
bookRouter.delete('/', authMiddleware.verifyToken(ROLES.ADMIN), bookController.deleteBook);
bookRouter.delete('/:bookId', authMiddleware.verifyToken(ROLES.ADMIN), bookController.deleteSingleBook);

module.exports = bookRouter;
