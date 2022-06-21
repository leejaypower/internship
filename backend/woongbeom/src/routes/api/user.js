const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const userRouter = new Router();

userRouter.post('/', controller.user.createUser);
userRouter.get('/', middleware.auth.authorization.authorizeAdmin, controller.user.getUsers);
userRouter.get('/signin', controller.user.signIn);
userRouter.get('/:id', controller.user.getUserById);
userRouter.patch('/:id', controller.user.updateUserName);

module.exports = userRouter;
