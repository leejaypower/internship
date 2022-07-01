/* eslint-disable no-unused-vars */
const schedule = require('node-schedule');
const kafka = require('../kafkaClient');

const { dueDateNotificationService } = require('../../services/kafka');

const { constants } = require('../../common');

const { DUE_DATE_NOTIFICATION } = constants.KAFKA_TOPIC;

const producer = kafka.producer();

const run = async () => {
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
  } catch (err) {
    await producer.disconnect();
    console.log(`[kafka/producer/dueDateScheduler] ${err.message}`, err);
  }
};

module.exports = {
  run,
};
