const Router = require('@koa/router');
const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const { TABLE } = require('../utils/constants');

const authRouter = new Router();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware([TABLE.USER_ROLE.USER, TABLE.USER_ROLE.ADMIN]), authController.logout);
authRouter.post('/token', authController.refreshAccessToken);

module.exports = authRouter;
