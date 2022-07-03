const Router = require('koa-router');

const mypageRouter = new Router();

const { mypageApi } = require('../controller');
const { auth } = require('../middleware');

// GET 메소드
mypageRouter.get('/', auth.userAuth, mypageApi.getMypage);

// DELETE 메소드
mypageRouter.delete('/', auth.userAuth, mypageApi.deleteMyAccount); // 회원탈퇴

module.exports = mypageRouter;
