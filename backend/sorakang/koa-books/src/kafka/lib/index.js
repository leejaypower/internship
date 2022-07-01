const { Kafka, logLevel } = require('kafkajs');

// client 추가되는 경우 모듈화 수정 필요
const getClient = () => {
  const clientId = process.env.KAFKA_CLIENT_ID;
  const brokers = [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`];
  const kafkaClient = new Kafka({
    clientId, brokers, logLevel: logLevel.DEBUG, retries: 2,
  });
  return { kafkaClient };
};

module.exports = { getClient };
