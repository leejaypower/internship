const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'internship-woongbeom',
  brokers: ['localhost:8095'],
});

const admin = kafka.admin();

const initAdmin = async () => {
  await admin.connect();
  await admin.createTopics({
    validateOnly: false,
    timeout: 3000,
    waitForLeaders: true,
    topics: [{
      topic: 'initTopic',
      numPartitions: 1,
      replicationFactor: 1,
      configEntries: [],
    }],
  });
};

module.exports = {
  initAdmin,
};
