require('../../../common/util/env');
const { logger } = require('../../../../log/config/logger');
const { CustomError, ERROR_CODE } = require('../../../common/error');
const { overdueService } = require('../../../services/restAPI');

const { kafka, topic } = require('../../index');

const consumer = kafka.consumer({
  groupId: 'overdueEmail',
  heartbeatInterval: 3000,
});

const consume = async () => {
  const emailList = [];
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    autoCommit: true,
    autoCommitThreshold: 100,
    eachMessage: async ({ topic, partition, message }) => {
      logger.info('===Metadata===: ', '\n', {
        topic,
        partition,
        offset: message.offset,
        value: JSON.parse(message.value),
      });

      const email = `${message.value.User.userName} <${message.value.User.email}>`;
      await overdueService.sendOverDueEmail(email);
      emailList.splice(0);
    },
  });
};

consume().catch((err) => {
  throw new CustomError(ERROR_CODE.SERVER_ERROR, err.message, '[kafka/consumer/overdueEmail/SERVER_ERROR]');
});
