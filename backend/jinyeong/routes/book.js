const Router = require('koa-router');
const { bookApi } = require('../apis');

const bookRouter = new Router();

// GET 메소드
bookRouter.get('/', bookApi.getAll);
bookRouter.get('/:book_id', bookApi.getById);

// POST 메소드
bookRouter.post('/', bookApi.createBook);

// PATCH 메소드
bookRouter.patch('/:book_id', bookApi.updateBook);

// DELETE 메소드
bookRouter.delete('/:book_id', bookApi.deleteBook);

module.exports = bookRouter;
