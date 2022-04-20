const Router = require('koa-router');

const api = new Router();

api.get('/books', (ctx) => {
  ctx.body = `GET ${ctx.request.path}`;
});

module.exports = api;
