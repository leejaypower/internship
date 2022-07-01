const { Kafka } = require('kafkajs');

const { constants } = require('../common');

const { INTERNSHIP_JINYEONG } = constants.KAFKA_CLIENT_ID;

const kafka = new Kafka({
  clientId: INTERNSHIP_JINYEONG,
  brokers: [process.env.BROKER_HOST_AND_PORT],
  connectionTimeout: 3000,
  requestTimeout: 30000,
  retry: {
    initialRetryTime: 100,
    retries: 5,
  },
});

module.exports = kafka;
