const { returnEventType } = require('../../eventType');
const { RentalHistory } = require('../../../database/models');
const { getClient } = require('../../lib');

/**
 * 책 반납 내역 DB저장* @param {Object} rentHistoryInfo 대여 히스토리 테이블에 저장 할 정보
 * @returns
 */

const returnHistoryHandler = async (rentHistoryInfo) => {
  const rentHistory = await RentalHistory.create(rentHistoryInfo);
  return { rentHistory };
};

const { kafkaClient } = getClient();
const topic = 'return-date-topic';
const kafkaConsumer = kafkaClient.consumer({ groupId: 'return-date' });

// Kafka로부터 data를 consume하고 db에 data를 저장

const consumeMessage = async () => {
  await kafkaConsumer.connect();
  console.log('******* Consumer connected *******.');

  await kafkaConsumer.subscribe({ topic });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const decodedMessage = returnEventType.fromBuffer(message.value);

      const returnInfo = {
        ...decodedMessage,
        returnDate: Date(decodedMessage.returnDate),
        rentalDate: Date(decodedMessage.rentalDate),
      };
      console.log('******* Decoded Message *******', returnInfo);
      await returnHistoryHandler(returnInfo);
    },
  });
};

const consumerShutdown = async () => {
  await kafkaConsumer.disconnect();
};

module.exports = { consumeMessage, consumerShutdown };
/*

const consumerShutdown = async () => {
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  signalTraps.map((type) => {
    process.once(type, async () => {
      try {
        await kafkaConsumer.disconnect();
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
};
*/
