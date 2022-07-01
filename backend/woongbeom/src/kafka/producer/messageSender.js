const { kafka } = require('../client');

const producer = kafka.producer();

const produceMessage = async (topicName, messageValue) => {
  await producer.connect();

  await producer.send({
    topic: topicName,
    messages: [{
      value: JSON.stringify(messageValue),
    }],
  });
};

module.exports = { produceMessage };
