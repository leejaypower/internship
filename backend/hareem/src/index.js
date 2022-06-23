const http = require('http');

require('./env');
const db = require('./database/models');
const app = require('./app');
const { apollo } = require('./apollo');

const serverRun = async () => {
  try {
    const PORT = process.env.PORT || 3000;

    // 차후, sync -> authenticate 로 변경 필요
    await db.sequelize.sync();
    console.log('db is connected');

    const httpServer = http.createServer();

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
