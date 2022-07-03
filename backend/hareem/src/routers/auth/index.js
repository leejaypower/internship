const Router = require('@koa/router');
const { USER_ROLE } = require('../../constants');
const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const authRouter = new Router();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware([USER_ROLE.USER, USER_ROLE.ADMIN]), authController.logout);
authRouter.post('/token', authController.refreshAccessToken);

module.exports = authRouter;
