const Router = require('@koa/router');
const { authController } = require('../controller');

const authRouter = new Router();
authRouter.get('/token', authController.getAccessToken);

module.exports = authRouter;
