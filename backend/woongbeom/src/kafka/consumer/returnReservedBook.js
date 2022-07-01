const { kafka } = require('../client');
const repository = require('../../repository');
const lib = require('../../../lib');

const { emailSender } = lib.util.emailer;

const consumer = kafka.consumer({ groupId: 'internship-woongbeom' });

/**
 * 데이터 소비
 * @param { String } topicName 토픽 이름
 */
const consumMessage = async (topicName) => {
  await consumer.subscribe({
    topic: topicName,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const consumedMessage = {
        topic,
        partition,
        offset: message.offset,
        value: JSON.parse(message.value.toString()),
      };

      const bookId = consumedMessage.value.id;
      const book = await repository.book.getBookById(bookId);
      const reservation = await repository.reservation.getReservationByBookId(bookId);
      const reservedUserId = reservation.userId;
      const user = await repository.user.getUserById(reservedUserId);

      const emailContents = {
        userEmail: 'gigyesik@barogo.com',
        // userEmail: user.email,
        subject: 'Book returned',
        html: `<b>Reserved book '${book.title}' returned.</b>`,
      };

      emailSender(emailContents);
    },
  });
};

module.exports = { consumer, consumMessage };
