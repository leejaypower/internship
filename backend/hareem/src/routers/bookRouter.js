const Router = require('@koa/router');
const { bookController } = require('../controllers');

const bookRouter = new Router();

// todo
// [] 책 정보 확인
// [x] 책 list 확인
// [] 책 입고
// [x] 책 출고
// bookRouter.get('/', userController.getUsers);
// bookRouter.get('/:id', userController.getUser);
bookRouter.post('/', bookController.createBook);
// bookRouter.delete('/:id', userController.deleteUser);

module.exports = bookRouter;
