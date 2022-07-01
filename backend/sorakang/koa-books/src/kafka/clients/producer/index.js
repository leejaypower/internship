/* eslint-disable no-underscore-dangle */
const { getClient } = require('../../lib');

const { kafkaClient } = getClient();
const producer = kafkaClient.producer();
const topic = 'return-date-topic'; // topic이 늘어나면 상수로 관리..?

const _makeMessage = async (dataType, data) => {
  const encoded = dataType.toBuffer(data);
  const messages = [{ value: encoded }];
  return messages;
};

const producerShutdown = async () => {
  await producer.disconnect();
};

const sendMessage = async (dataType, data) => {
  try {
    await producer.connect();
    console.log('******* Producer connected *******.');

    // message생성
    const messages = await _makeMessage(dataType, data);

    // message작성이 확인될 때까지 코드가 차단된다.
    await producer.send({ topic, messages });
    console.log('******* message *******', messages);
  } catch (err) {
    console.error(`could not write message ${err}`);
    producerShutdown();
  }
};

module.exports = { sendMessage, producerShutdown };
