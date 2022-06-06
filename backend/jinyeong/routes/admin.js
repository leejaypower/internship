const Router = require('koa-router');

const adminRouter = new Router();
const { adminApi } = require('../apis');

// POST 요청
adminRouter.post('/sign-up', adminApi.signUp); // 관리자계정 회원가입 요청

// PATCH 요청
adminRouter.patch('/log-in', adminApi.logIn); // 관리자계정 로그인 요청

module.exports = adminRouter;
