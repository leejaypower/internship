const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const userRouter = new Router();

userRouter.post('/', controller.user.createUser);
userRouter.get('/', middleware.auth.authorization.authorizeAdmin, controller.user.getListAll);
userRouter.get('/signin', controller.user.signIn);

module.exports = userRouter;
