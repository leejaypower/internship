const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const rootRouter = require('../router');

// set environment variable globally
require('../utils/env');

const { sequelize } = require('../database/models/index');

const app = new Koa();

// middlewares
app.use(cors());
app.use(bodyParser());
app.use(rootRouter.routes()); // route

// db connection test and sync
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!');
  })
  .then(sequelize.sync())
  .catch((err) => {
    console.error('Unable to connect to the database', err);
  });

module.exports = app;
