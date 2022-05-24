require('./common/util/env');

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger'); // 요청 액세스 로깅을 위한 미들웨어
const router = require('./routes');

const PORT = 4000;
const app = new Koa();

app
  .use(cors())
  .use(bodyParser())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
