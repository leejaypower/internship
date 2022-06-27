const nodemailer = require('nodemailer');

const sendOverDueEmail = async (email) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.OVERDUE_MAILER_EMAIL,
      pass: process.env.OVERDUE_MAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // 단체 메일을 보내는 경우 다른 사람의 메일이 노출되는 것을 방지하기 위해 'to'가 아닌 'bcc' 옵션에 보내는 사람 추가
  const mailOptions = {
    from: `Barogo <${process.env.OVERDUE_MAILER_EMAIL}>`,
    to: email,
    subject: '[바로고 도서관] 도서 연체 안내',
    text: '안녕하세요, 회원님. 바로고 도서관입니다. \n 고객님이 대출하신 도서의 반납 기한이 경과하였습니다.  \n 빠른 시간 안에 반납 부탁드립니다.',
    dsn: {
      id: 'failuer-emails',
      return: 'headers',
      // 메일 전송 실패시 메일 전송자에게 알림
      notify: ['failure', 'delay'],
      recipient: `Barogo <${process.env.OVERDUE_MAILER_EMAIL}>`,
    },
  };

  const sendResult = await transport.sendMail(mailOptions);

  // 보낸 메일의 id를 로깅 -> 에러/로그 처리 모듈이 아직 merge되지 않아 console.log로 임시 대체
  console.log('Email sent: %s', sendResult.messageId);
};

module.exports = { sendOverDueEmail };
