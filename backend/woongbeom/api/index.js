const Router = require('koa-router');
const testApi = require('./testapi');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'api main';
});

router.use('/testapi', testApi.routes());

module.exports = router;
