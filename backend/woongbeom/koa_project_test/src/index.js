const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const api = require('./api');

router.use('/api', api.routes());

router.get('/', (ctx) => {
  ctx.body = 'home';
});

router.get('/about', (ctx) => {
  ctx.body = 'introduce';
});

router.get('/about/:name', (ctx) => {
  const { name } = ctx.params;
  ctx.body = `${name}'s introduce`;
});

router.get('/post', (ctx) => {
  const { id } = ctx.request.query;
  if (id) {
    ctx.body = `post # ${id}`;
  } else {
    ctx.body = 'none post id';
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  // console.log('listening to port 4000');
});
