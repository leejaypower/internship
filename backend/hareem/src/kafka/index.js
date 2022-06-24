const admin = require('./admin');
const consumer = require('./consumer');
const producer = require('./producer');

const consumerRun = async () => {
  const consumerInstance = consumer.getConsumerInstance({
    groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
  });

  await consumerInstance.connectConsumer();

  // 차루 topic 구독 및 consumer 핸들링 로직 추가
};

const producerRun = async () => {
  await producer.connectProducer();
};

module.exports = {
  ...admin,
  ...consumer,
  ...producer,
  consumerRun,
  producerRun,
};
