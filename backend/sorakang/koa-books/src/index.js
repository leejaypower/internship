// set environment variable globally
require('./utils/common/env');

const { sequelize } = require('./database/models/index');
const app = require('./server/app');
const { startApolloServer } = require('./server/apollo');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!');
  })
  // .then(sequelize.sync())
  .catch((err) => {
    console.error('Unable to connect to the database', err);
    process.exit(1);
  });

startApolloServer(app);
