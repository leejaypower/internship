const Router = require('koa-router');

const controller = require('../../controller');
const middleware = require('../../middleware');
const lib = require('../../lib');

const userRouter = new Router();

const { authorizeAdmin, authorizeUser } = middleware.auth.authorization;
const { user } = controller;
const { logger } = lib.util;

userRouter.post('/', logger.logRequest, user.createUser);
userRouter.get('/', logger.logRequest, authorizeAdmin, user.getUsers);
userRouter.get('/email', logger.logRequest, authorizeAdmin, user.getUserByEmail);
userRouter.get('/signin', logger.logRequest, user.signIn);

userRouter.get('/:id', logger.logRequest, authorizeAdmin, user.getUserById);
userRouter.patch('/:id', logger.logRequest, authorizeUser, user.updateUserName);

module.exports = userRouter;
