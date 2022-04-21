const Router = require('koa-router');
const bookApi = require('./book');

const router = new Router();

// 메인페이지
router.get('/', (ctx) => {
  ctx.body = 'Main Page!!';
});

// book API 연결
router.use('/book', bookApi.routes());

module.exports = router;
