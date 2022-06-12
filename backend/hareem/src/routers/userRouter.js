const Router = require('@koa/router');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const { TABLE } = require('../utils/constants');

const userRouter = new Router();

userRouter.get('/self', authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN]), userController.getUserSelf);
userRouter.patch('/self', authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN]), userController.updateUserSelf); // userController.updateUserSelf
userRouter.delete('/self', authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN]), userController.deleteUserSelf);

userRouter.get('/', authMiddleware([TABLE.USER_ROLE.ADMIN]), userController.getUsers);
userRouter.get('/:id', authMiddleware([TABLE.USER_ROLE.ADMIN]), userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', authMiddleware([TABLE.USER_ROLE.ADMIN]), userController.updateUser);
userRouter.delete('/:id', authMiddleware([TABLE.USER_ROLE.ADMIN]), userController.deleteUser);

module.exports = userRouter;
