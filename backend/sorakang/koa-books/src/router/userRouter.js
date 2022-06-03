const Router = require('@koa/router');
const { hashMiddleware, authMiddleware } = require('../middleware');

const userRouter = new Router();
const { userController } = require('../controller');

userRouter.get('/all', authMiddleware.verifyToken('admin'), userController.getUser);
userRouter.get('/:userId', authMiddleware.verifyToken('user', 'admin'), userController.getSingleUser);
userRouter.post('/', hashMiddleware.hash, userController.createUser);
userRouter.patch('/:userId', authMiddleware.verifyToken('user', 'admin'), hashMiddleware.hash, userController.updateUser);
userRouter.delete('/:userId', authMiddleware.verifyToken('user', 'admin'), userController.deleteUser);
userRouter.post('/signin', userController.signIn);
userRouter.post('/signout', authMiddleware.verifyToken('user', 'admin'), userController.signOut);

module.exports = userRouter;
