const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = require('./routes');
const db = require('./db/models');

router
  .get('/', (ctx) => {
    ctx.body = 'main page';
  });

const PORT = 4000;

module.exports = {
  start: () => {
    app.context.db = db;

    app
      .use(bodyParser())
      .use(router.routes());

    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  },
};
