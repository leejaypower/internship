const Router = require('koa-router');

const userRouter = new Router();
const { userApi } = require('../apis');

// GET 메소드
userRouter.get('/', userApi.getAll);
userRouter.get('/:user_id', userApi.getById); // 유저아이디를 통한 유저정보 조회(관리자 권한)

// TODO: auth 통합 후, 미들웨어 auth에서 액세스토큰 식별정보를 통해 조회하도록 수정.
userRouter.get('/mypage/:user_id', userApi.getMypageByUserId); // 자신의 회원정보 조회(유저 권한)

// POST 메소드
userRouter.post('/sign-up', userApi.signUp); // 회원가입

// PATCH 메소드
userRouter.patch('/log-in', userApi.logIn); // 로그인

// DELETE 메소드
userRouter.delete('/mypage/:user_id', userApi.deleteMyAccount); // 회원탈퇴

module.exports = userRouter;
