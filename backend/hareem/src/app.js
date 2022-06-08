const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { errorHandlingMiddleware } = require('./middlewares');
const router = require('./routers');

const app = new Koa();

app.use(bodyParser());
app.use(errorHandlingMiddleware);
app.use(router.routes());

module.exports = app;
