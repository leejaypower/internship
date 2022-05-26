const { BookSerial } = require('../database/models');

const getBookSerial = async (bookId) => {
  // 현 조회 기준은 book id임. pubData기준으로 조회 로직 구축 예정
  // [Op.like] 속성 이용해보기
  try {
    const bookSerialList = await BookSerial.findAll({
      where: { bookId },
    });

    return bookSerialList;
  } catch (err) {
    return err.message;// 임시 error handling
  }
};

const createBookSerial = async (book, t) => {
  try {
    const { id } = book;
    const bookSerialInfo = await BookSerial.create({
      bookId: id, t,
    });
    return bookSerialInfo;
  } catch (err) {
    throw new Error(err.message);// 임시 error handling
  }
};

module.exports = {
  getBookSerial, createBookSerial,
};
