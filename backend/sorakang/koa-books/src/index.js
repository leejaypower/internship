// set environment variable globally
require('./config/env');

const { sequelize } = require('./database/models/index');
const app = require('./server/app');
const { startApolloServer } = require('./server/apollo');
const { kafkaClients } = require('./kafka');

const dbInit = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully!');
    });
};

const init = async () => {
  try{
    await dbInit();
    await kafkaClients.returnHistoryConsume.consumeMessage();
    startApolloServer(app);
  } catch (err) {
    console.error('Initialization failed', err);
    await kafkaClients.returnHistoryProducer.producerShutdown()
    await kafkaClients.returnHistoryConsume.consumerShutdown();
    process.exit(1);
};



// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully!');
//   })
//   // .then(sequelize.sync())
//   .catch((err) => {
//     console.error('Unable to connect to the database', err);
//     process.exit(1);
//   });
// startApolloServer(app);