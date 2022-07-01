const { rentalQuery } = require('../../repository');

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

module.exports = {
  makeMessageForNotification,
};
