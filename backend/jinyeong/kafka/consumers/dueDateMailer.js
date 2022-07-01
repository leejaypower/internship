/* eslint-disable no-unused-vars */
const kafka = require('../kafkaClient');
const { dueDateNotificationService } = require('../../services/kafka');
const { constants, util } = require('../../common');

const { mailer } = util;

const { DUE_DATE_NOTIFICATION } = constants.KAFKA_TOPIC;
const { DUE_DATE_MAILER } = constants.KAFKA_CONSUMER_GROUP_ID;

const makeConsumersInConsumerGroup = async (consumerCount) => {
  try {
    const consumerConfig = {
      groupId: DUE_DATE_MAILER,
      allowAutoTopicCreation: false,
    };

    const consumerGroup = [];
    for (let i = 0; i < consumerCount; i += 1) {
      const consumer = kafka.consumer(consumerConfig);
      consumerGroup.push(consumer);
    }

    const promises = consumerGroup.map(async (consumer) => {
      await consumer.connect();
      await consumer.subscribe({ topic: DUE_DATE_NOTIFICATION });
      return consumer;
    });

    const resolvedArr = await Promise.allSettled(promises);

    const onlyFullfilled = resolvedArr.filter((consumer) => {
      return consumer.status === 'fulfilled';
    });

    return onlyFullfilled.map((fulfilledConsumer) => {
      return fulfilledConsumer.value;
    });
  } catch (error) {
    throw new Error('[kafka/consumer/dueDateMailer] 컨슈머 그룹 생성과정에서 에러가 발생했습니다.');
  }
};

const start = async () => {
  const transporter = mailer.createTransporter();
  console.log('[kafka/consumer/dueDateMailer] Mail Transporter Connected!');

  const consumerGroup = await makeConsumersInConsumerGroup(3);
  console.log('[kafka/consumer/dueDateMailer] Consumer Group Connected!');

  consumerGroup.map(async (consumer) => {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          console.log(`[kafka/consumer/dueDateMailer] Partition: ${partition}, Offset: ${message.offset}, Message: ${message.value}`);

          const messageValue = JSON.parse(message.value);

          try {
            await dueDateNotificationService.sendDuedateNotificateMail(transporter, messageValue);
          } catch (err) {
            console.log(err.message);
            console.error(`[MAIL SENDING FAILED]반납예정일 도래 알림 메일 전송에 실패했습니다. 유저 이메일: ${messageValue.userEmail}`);
            return;
          }

          console.log('[kafka/consumer/dueDateMailer] Sending Mail Successfully!');
        } catch (err) {
          await consumer.disconnect();
          console.log(`[kafka/consumer/dueDateMailer] ${err.message}`, err);
        }
      },
    });
  });
};

module.exports = {
  start,
};
