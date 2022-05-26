const Router = require('@koa/router');
const { bookController } = require('../controllers');

const bookRouter = new Router();

bookRouter.get('/', bookController.getBookInfos);
bookRouter.get('/:bookInfoId', bookController.getBookInfo);
bookRouter.post('/', bookController.createBookInfoWithBook);
bookRouter.patch('/:bookInfoId', bookController.updateBookInfo);
bookRouter.delete('/:id', bookController.deleteBook);

module.exports = bookRouter;
