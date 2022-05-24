const Router = require('koa-router');

const userRouter = new Router();
const { userApi } = require('../apis');

// GET 요청
userRouter.get('/', userApi.getAll); // 전체 유저정보 조회(관리자 권한)
userRouter.get('/:user_id', userApi.getOneByUserId); // 유저정보 조회 by 유저아이디(관리자 권한)
// TODO: auth 통합 후, 미들웨어 auth에서 액세스토큰 식별정보를 통해 조회하도록 수정.
userRouter.get('/mypage/:user_id', userApi.getMypageByUserId); // 유저가 자신의 회원정보 조회

// POST 요청
userRouter.post('/sign-up', userApi.signUp); // 회원가입 요청

// PATCH 요청
userRouter.patch('/log-in', userApi.logIn); // 로그인 요청

// DELETE 요청
userRouter.delete('/mypage/:user_id', userApi.deleteMyAccount); // 회원탈퇴 기능
module.exports = userRouter;
