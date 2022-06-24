/* eslint-disable no-underscore-dangle */
const httpServer = require('http').createServer();

require('dotenv').config();
const db = require('./database/models');
const kafka = require('./kafka');
const app = require('./app');
const apollo = require('./apollo');

const _dbInitialize = async () => {
  if (process.env.NODE_ENV === 'production') {
    await db.sequelize.authenticate();
  } else {
    await db.sequelize.sync();
  }
  console.log('db is connected');
};

const _kafkaInitialize = async () => {
  if (process.env.NODE_ENV === 'production') {
    await kafka.producerRun();
    await kafka.consumerRun();
  } else {
    await kafka.syncTopics();

    await kafka.producerRun();
    await kafka.consumerRun();
  }
  console.log('kafka is connected');
};

const serverRun = async () => {
  try {
    const PORT = process.env.PORT || 4001;

    await _dbInitialize();

    await _kafkaInitialize();

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
