const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('../api');

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser());

app.listen(4000);
