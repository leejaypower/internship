require('../../../common/util/env');
const schedule = require('node-schedule');
const { logger } = require('../../../../log/config/logger');
const { CustomError, ERROR_CODE } = require('../../../common/error');
const { rentalRepository } = require('../../../repository');

const { kafka, topic } = require('../../index');

const producer = kafka.producer({
  allowAutoTopicCreation: false,
  transactionTimeout: 30000,
});

const produce = async (overdueRentalData) => {
  await producer.connect();
  // 연체된 유저와 책의 정보를 1개씩 나누어서 카프카 메세지로 보냄
  for (let i = 0; i < overdueRentalData.length; i += 1) {
    const overdueRentals = overdueRentalData.slice(i, i + 1);
    const payloads = {
      topic,
      acks: 1,
      messages: [{
        value: JSON.stringify(overdueRentals),
      }],
    };
    producer.send(payloads);
    logger.info('Message: ', JSON.stringify(overdueRentals));
  }
};

// 스케줄러는 주1회 정도가 적절하지만, 테스트 용도로 임시 5초로 설정
const rule = new schedule.RecurrenceRule();
rule.second = new schedule.Range(0, 59, 5);

const sendOverdueUsersMessage = schedule.scheduleJob(rule, async () => {
  // 대출 건에서 사용자와 도서의 id를 조회하여 유저와 도서의 정보를 가져오도록 함
  try {
    const overdueRentals = await rentalRepository.getRentalsWithUserBook({ overdue: true });
    await produce(overdueRentals);
  } catch (err) {
    throw new CustomError(ERROR_CODE.SERVER_ERROR, err.message, '[kafka/producer/overdueRentals/SERVER_ERROR]');
  }
});

module.exports = sendOverdueUsersMessage;
