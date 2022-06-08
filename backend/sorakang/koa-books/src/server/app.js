const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const { rootRouter } = require('../api/rest');

const app = new Koa();

// middleware
app.use(cors());
app.use(bodyParser());
// app.use(logger());
app.use(rootRouter.routes()); // route

module.exports = app;
