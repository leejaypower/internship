const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

require('./utils/env');

const db = require('./database/models');
const router = require('./routers');

db.sequelize.sync()
  .then(() => console.log('db is connected'))
  .catch((err) => console.log(err));

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

module.exports = app;
