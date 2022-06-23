const Router = require('@koa/router');
const { TABLE } = require('../../constants');
const { bookController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const bookRouter = new Router();

bookRouter.get('/', bookController.getBookInfos);
bookRouter.get('/:bookInfoId', bookController.getBookInfo);
bookRouter.post('/', authMiddleware([TABLE.USER_ROLE.ADMIN]), bookController.createBookInfoWithBook);
bookRouter.patch('/:bookInfoId', authMiddleware([TABLE.USER_ROLE.ADMIN]), bookController.updateBookInfo);
bookRouter.delete('/:id', authMiddleware([TABLE.USER_ROLE.ADMIN]), bookController.deleteBook);

module.exports = bookRouter;
