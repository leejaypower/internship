const Router = require('koa-router');

const bookRouter = new Router();

const { bookApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
bookRouter.get('/', bookApi.getAll);
bookRouter.get('/:book_id', auth.userAuth, bookApi.getById);

// POST 메소드
bookRouter.post('/', auth.adminAuth, bookApi.createBook);

// PATCH 메소드
bookRouter.patch('/:book_id', auth.adminAuth, bookApi.updateBook);

// DELETE 메소드
bookRouter.delete('/:book_id', auth.adminAuth, bookApi.deleteBook);

module.exports = bookRouter;
