const nodemailer = require('nodemailer');

const createTransporter = (service, host, from) => {
  const transporter = nodemailer.createTransport({
    service: service || 'naver',
    port: 587,
    host: host || 'smtp.naver.com',
    auth: {
      user: process.env.MAILER_EMAIL, // 보내는 메일의 주소
      pass: process.env.MAILER_PASSWORD, // 보내는 메일의 비밀번호
    },
  }, {
    from: `Barogo <${from || process.env.MAILER_EMAIL}>`,
  });

  return transporter;
};

const makeDateStringForMail = (dateObj) => {
  const weekDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dueDay = weekDay[dateObj.getDay()];

  return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${dueDay} ${dateObj.getHours()}시 ${dateObj.getMinutes()}`;
};

module.exports = {
  createTransporter,
  makeDateStringForMail,
};
