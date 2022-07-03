const Router = require('koa-router');

const userRouter = new Router();

const { userApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
userRouter.get('/', auth.adminAuth, userApi.getAll);
userRouter.get('/:user_id', auth.adminAuth, userApi.getById);

// POST 메소드
userRouter.post('/sign-up', userApi.signUp); // 회원가입

// PATCH 메소드
userRouter.patch('/log-in', userApi.logIn); // 로그인

module.exports = userRouter;
