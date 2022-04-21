const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./api');

const PORT = 4000;

const app = new Koa();

app
  // cors, bodyParser 미들웨어
  // TODO: 세부설정 알아보기
  .use(cors())
  .use(bodyParser())
  // routing 설정
  // TODO: allowedMethods 옵션에 대해서 알아보기
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
