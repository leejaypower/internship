const Router = require('koa-router');

const controller = require('../../controller');

const adminRouter = new Router();

adminRouter.get('/signin', controller.apis.admin.signIn);

module.exports = adminRouter;
