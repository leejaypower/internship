require('../../../common/util/env');

const { kafka, topic } = require('../../index');

const consumer = kafka.consumer({
  groupId: 'overdueStats',
  heartbeatInterval: 3000,
});

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    autoCommit: true,
    autoCommitThreshold: 100,
    eachMessage: async ({ topic, partition, message }) => {
      console.log('===Metadata===: ', '\n', {
        topic,
        partition,
        offset: message.offset,
        value: JSON.parse(message.value),
      });

      /* 대출 연체 건에 대한 통계를 수집할 목적의 consumer이지만,
        아직 어떤 플랫폼을 통해 통계를 파악할 지 결정하지 못해 console.log로 대체하였습니다. */
      console.log('Message: ', JSON.parse(message.value));
    },
  });
};

consume().catch((err) => {
  console.error('error in consumer: ', err);
});
