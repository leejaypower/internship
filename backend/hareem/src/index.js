const httpServer = require('http').createServer();

require('dotenv').config();
const db = require('./database/models');
const app = require('./app');
const { apollo } = require('./apollo');

const serverRun = async () => {
  try {
    const PORT = process.env.PORT || 4001;

    if (app.env !== 'production') {
      await db.sequelize.sync();
    } else {
      await db.sequelize.authenticate();
    }
    console.log('db is connected');

    await apollo.start();
    apollo.applyMiddleware({ app });
    httpServer.on('request', app.callback());
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);

    return { apollo, app };
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

serverRun();
