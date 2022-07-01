const Router = require('koa-router');

const controller = require('../../controller');

const adminRouter = new Router();

const { admin } = controller;

adminRouter.get('/signin', admin.signIn);

module.exports = adminRouter;
