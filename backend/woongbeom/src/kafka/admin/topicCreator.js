const { kafka } = require('../client');

const admin = kafka.admin();

const createTopic = async (topicName) => {
  await admin.connect();
  await admin.createTopics({
    validateOnly: false,
    timeout: 3000,
    waitForLeaders: true,
    topics: [{
      topic: topicName,
      numPartitions: 1,
      replicationFactor: 1,
      configEntries: [],
    }],
  });
};

module.exports = {
  createTopic,
};
