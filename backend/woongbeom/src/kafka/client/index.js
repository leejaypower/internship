const { Kafka } = require('kafkajs');

const { env } = process;

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: [env.KAFKA_BROKER],
});

module.exports = { kafka };
