const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'internship-woongbeom',
  brokers: ['localhost:8095'],
});

const consumer = kafka.consumer({ groupId: 'internship-woongbeom' });

const initConsumer = async () => {
  await consumer.connect();
  const subscribeTopic = await consumer.subscribe({
    topic: 'initTopic',
  });

  const runMessage = await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

module.exports = { initConsumer };
