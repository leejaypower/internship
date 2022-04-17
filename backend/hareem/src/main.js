import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

const PORT = 3000;

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/(.*)', (ctx) => {
  ctx.body = 'hello world';
});

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`server run on port http://localhost:${PORT}`);
});
