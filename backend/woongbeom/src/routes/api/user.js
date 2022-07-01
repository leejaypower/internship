const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');

const userRouter = new Router();

const { authorizeAdmin, authorizeUser } = middleware.auth.authorization;
const { user } = controller;

userRouter.post('/', user.createUser);
userRouter.get('/', authorizeAdmin, user.getUsers);
userRouter.get('/email', authorizeAdmin, user.getUserByEmail);
userRouter.get('/signin', user.signIn);

userRouter.get('/:id', authorizeAdmin, user.getUserById);
userRouter.patch('/:id', authorizeUser, user.updateUserName);

module.exports = userRouter;
