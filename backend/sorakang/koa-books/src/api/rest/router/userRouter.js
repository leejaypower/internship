const Router = require('@koa/router');
const { hashMiddleware, authMiddleware } = require('../../../middleware');

const userRouter = new Router();
const { userController } = require('../controller');
const { constant } = require('../../../libs');

const { ROLES } = constant;

userRouter.get('/all', authMiddleware.verifyToken(ROLES.ADMIN), userController.getUser);
userRouter.get('/:userId', authMiddleware.verifyToken(ROLES.COMMON), userController.getSingleUser);
userRouter.post('/', hashMiddleware.hash, userController.createUser);
userRouter.patch('/:userId', authMiddleware.verifyToken(ROLES.COMMON), hashMiddleware.hash, userController.updateUser);
userRouter.delete('/:userId', authMiddleware.verifyToken(ROLES.COMMON), userController.deleteUser);
userRouter.post('/signin', userController.signIn);
userRouter.post('/signout', authMiddleware.verifyToken(ROLES.COMMON), userController.signOut);

module.exports = userRouter;
