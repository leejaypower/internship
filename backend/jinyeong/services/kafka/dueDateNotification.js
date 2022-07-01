const { rentalQuery } = require('../../repository');
const { util } = require('../../common');

const { mailer } = util;

// NOTE: 반납예정일이 하루남은 대출유저에게 보낼 안내 메일에 담기는 내용(value)을 생성합니다.
const makeMessageForNotification = async () => {
  const rentalListLeftOneDyToDueDate = await rentalQuery.getUsersLeftOneDayToDueDate();

  return rentalListLeftOneDyToDueDate.map((data) => {
    const {
      userName,
      userEmail,
      bookName,
      dueDate,
    } = data;

    const messageValue = JSON.stringify({
      userName,
      userEmail,
      bookName,
      dueDate,
    });

    return { value: messageValue };
  });
};

// NOTE: 반납예정일이 하루 남은 유저들에게 반납예정일에 대한 시간정보를 정해진 메일로 보냅니다.
const sendDuedateNotificateMail = async (transporter, message) => {
  const {
    userName,
    userEmail,
    bookName,
    dueDate,
  } = message;

  const dueDateObj = new Date(dueDate);
  const dueDateStringForMail = mailer.makeDateStringForMail(dueDateObj);

  const mailOptions = {
    to: `${userName}님 <${userEmail}>`,
    subject: '[대출반납도래일 안내]바로고 도서관',
    text: `
      ${userName}님께서 대출중이신
      도서 "${bookName}"의
      대출반납일은 ${dueDateStringForMail}까지입니다.
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  makeMessageForNotification,
  sendDuedateNotificateMail,
};
