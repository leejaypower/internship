/* eslint-disable no-unused-vars */
const schedule = require('node-schedule');
const kafka = require('../kafkaClient');

const { dueDateNotificationService } = require('../../services/kafka');

const { constants } = require('../../common');

const { DUE_DATE_NOTIFICATION } = constants.KAFKA_TOPIC;

const producer = kafka.producer();

const start = async () => {
  try {
    await producer.connect();
    console.log('[kafka/producer/dueDateScheduler] Connected');

    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1, 5)]; // 월 ~ 금요일
    rule.hour = 9;
    rule.minute = 0;

    schedule.scheduleJob(rule, async () => {
      const messages = await dueDateNotificationService.makeMessageForNotification();

      await producer.send({ topic: DUE_DATE_NOTIFICATION, messages });
      console.log('[kafka/producer/dueDateScheduler] Sending Message Successfully');
    });

    /*
      NOTE: 위 기능의 경우, 테스트가 어렵기 때문에 코드 변경 시 기능 테스트를 위한 코드를 아래 남겨놓습니다!
      아래의 코드는 매 5초마다 반납예정일이 도래한 유저에게 메일을 보내는 코드입니다.

      [ 주의 : 테스트 시, 실 유저에게 보내지 않도록 메일을 확인해 볼 것 ]

      schedule.scheduleJob('*'.concat('/5 * * * * *'), async () => {
        const messages = await dueDateNotificationService.makeMessageForNotification();

        await producer.send({ topic: DUE_DATE_NOTIFICATION, messages });
        console.log('[Kafka/Producer] Sending Message Successfully');
      });
    */
  } catch (err) {
    await producer.disconnect();
    console.log(`[kafka/producer/dueDateScheduler] ${err.message}`, err);
  }
};

module.exports = {
  start,
};
