const Router = require('@koa/router');
const { authController } = require('../controller');

const authRouter = new Router();
// 접근은?
authRouter.get('/token', authController.getAccessToken);

module.exports = authRouter;
