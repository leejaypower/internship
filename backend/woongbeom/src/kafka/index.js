const admin = require('./admin');
const producer = require('./producer');
const consumer = require('./consumer');

const initkafka = async () => {
  await admin.initAdmin();
  await producer.initProducer();
  await consumer.initConsumer();
};
module.exports = { initkafka };
