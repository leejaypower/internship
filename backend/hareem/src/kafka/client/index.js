/* eslint-disable no-underscore-dangle */
const { Kafka } = require('kafkajs');
const { TOPIC } = require('../../constants');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [
    `${process.env.KAFKA_BROKER}`,
  ],
});

const getKafkaClient = () => kafka;

const getTopics = () => {
  const {
    MESSAGE_TYPE,
    DATASET_NAME,
    DATA_NAME,
  } = TOPIC;

  return [
    `${MESSAGE_TYPE.TRACKING}.${DATASET_NAME}.${DATA_NAME.RENTALS}`,
    `${MESSAGE_TYPE.TRACKING}.${DATASET_NAME}.${DATA_NAME.RESERVATIONS}`,
  ];
};

module.exports = {
  getKafkaClient,
  getTopics,
};
