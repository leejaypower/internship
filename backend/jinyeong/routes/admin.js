const Router = require('koa-router');

const adminRouter = new Router();
const { adminApi } = require('../controller');

// POST 요청
adminRouter.post('/sign-up', adminApi.signUp);

// PATCH 요청
adminRouter.patch('/log-in', adminApi.logIn);

module.exports = adminRouter;
