const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

require('./config');

const { bookRouter } = require('./routers');
const { sequelize } = require('./database/models');

sequelize.sync()
  .then(() => console.log('db is connected'))
  .catch((err) => console.log(err));

const app = new Koa();

app.use(cors({
  origin: '*',
}));

app.use(bodyParser());

app.use(bookRouter.routes());

module.exports = app;
