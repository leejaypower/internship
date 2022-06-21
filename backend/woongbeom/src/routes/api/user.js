const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const userRouter = new Router();

userRouter.post('/', controller.apis.user.createUser);
userRouter.get('/', middleware.auth.authorization.authorizeAdmin, controller.apis.user.getUsers);
userRouter.get('/email', middleware.auth.authorization.authorizeAdmin, controller.apis.user.getUserByEmail);
userRouter.get('/signin', controller.apis.user.signIn);

userRouter.get('/:id', middleware.auth.authorization.authorizeAdmin, controller.apis.user.getUserById);
userRouter.patch('/:id', middleware.auth.authorization.authorizeUser, controller.apis.user.updateUserName);

module.exports = userRouter;
