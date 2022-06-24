/* eslint-disable no-underscore-dangle */
const { getKafkaClient } = require('../client');

const kafka = getKafkaClient();

const _producer = kafka.producer({
  allowAutoTopicCreation: false,
});

const connectProducer = async () => {
  await _producer.connect();
};

const makeKafkaMessage = (messageData) => {
  const {
    topic,
    messages: originMessages,
  } = messageData;

  const messages = originMessages.map((originMessage) => {
    const message = {
      key: originMessage.key,
      value: JSON.stringify(originMessage.value),
    };
    return message;
  });

  return {
    topic,
    messages,
  };
};

const sendMessage = async (kafkaMessage) => {
  // 들어온 토픽이 있는지 없는지 검증 가능
  await _producer.send(kafkaMessage);
};

module.exports = {
  connectProducer,
  makeKafkaMessage,
  sendMessage,
};
