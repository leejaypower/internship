const Router = require('@koa/router');
const { userController } = require('../controllers');

const userRouter = new Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
