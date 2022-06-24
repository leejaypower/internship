const Koa = require('koa');
const bodyParser = require('koa-parser');

const router = require('./routes');

const app = new Koa();
const PORT = process.env.PORT || 4000;

const db = require('./db/models');

module.exports = {
  start: () => {
    db.sequelize.sync()
      .then(() => console.log('models synced!'))
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });

    app.use(bodyParser());
    app.use(router.routes());
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  },
};
