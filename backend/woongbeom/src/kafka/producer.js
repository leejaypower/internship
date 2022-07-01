const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'internship-woongbeom',
  brokers: ['localhost:8095'],
});

const producer = kafka.producer();

const initProducer = async () => {
  await producer.connect();
  const produceMessage = await producer.send({
    topic: 'initTopic',
    messages: [{
      key: 'key',
      value: 'topic message',
    }],
  });
};

module.exports = { initProducer };
