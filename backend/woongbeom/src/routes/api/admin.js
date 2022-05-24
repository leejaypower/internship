const Router = require('koa-router');

const controller = require('../../controller');

const adminRouter = new Router();

adminRouter.get('/signin', controller.admin.signIn);

module.exports = adminRouter;
