require('../common/util/env');
const { Kafka, logLevel } = require('kafkajs');

const clientId = process.env.KAFKA_CLIENT_ID;
const brokers = [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`];
const topic = 'overdue-rental-info';

const kafka = new Kafka({
  clientId,
  brokers,
  logLevel: logLevel.DEBUG,
  retry: {
    initialRetryTime: 20,
    retries: 5,
  },
});

module.exports = { kafka, topic };
