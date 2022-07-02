const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { errorMiddleware } = require('../middleware');
const { rootRouter } = require('../api/rest');
const { constant, errorHandler } = require('../libs');

const app = new Koa();
// Middleware
app.use(errorMiddleware);
app.use(cors());
app.use(bodyParser());
app.use(rootRouter.routes());

process.on('unhandledRejection', (err) => {
  // unhandled promise rejection을 catch & throw
  errorHandler.errorEventListener.errorListener(err);
  app.emit('error');
});

process.on('uncaughtException', (err) => {
  // 처리되지 않은 오류 catch , log 기록 , process 종료
  errorHandler.errorEventListener.errorListener(err);
  process.exit(1);
});

// Event listener
app.on(constant.EVENT.ERROR, errorHandler.errorEventListener.errorListener);

module.exports = app;
