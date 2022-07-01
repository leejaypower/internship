/* eslint-disable no-unused-vars */
const kafka = require('../kafkaClient');
const { constants } = require('../../common');

const { DUE_DATE_NOTIFICATION } = constants.KAFKA_TOPIC;
const { DUE_DATE_MAILER } = constants.KAFKA_CONSUMER_GROUP_ID;

const consumer = kafka.consumer({ groupId: DUE_DATE_MAILER });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: DUE_DATE_NOTIFICATION, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: JSON.parse(message.value),
        });
      },
    });
    console.log('[kafka/consumer/dueDateMailer] Consumer subscribing..');
  } catch (err) {
    await consumer.disconnect();
    console.log(`[kafka/consumer/dueDateMailer] ${err.message}`, err);
  }
};

module.exports = {
  run,
};
