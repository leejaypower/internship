const Router = require('@koa/router');
const { bookController } = require('../controllers');

const bookRouter = new Router({
  prefix: '/book',
});

bookRouter.get('/list', bookController.getBooks);
bookRouter.get('/:id', bookController.getBook);
bookRouter.post('/', bookController.createBook);
bookRouter.patch('/:id', bookController.updateBook);
bookRouter.delete('/:id', bookController.deleteBook);

module.exports = bookRouter;
