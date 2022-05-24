const Router = require('koa-router');

const controller = require('../../controller');
const auth = require('../../middleware/auth');

const userRouter = new Router();

userRouter.post('/signup', controller.user.createUser);
userRouter.get('/', auth.auth.authorizeAdmin, controller.user.getListAll);
userRouter.get('/signin', controller.user.signIn);

module.exports = userRouter;
