const { BookSerial } = require('../database/models');

const getBookSerial = async (bookId) => {
  const bookSerialList = await BookSerial.findAll({
    where: { bookId },
  });

  return bookSerialList;
};

/**
 * 위의 getBookSerial과 통합 얘정입니다.
 * get book serial number list
 * @param {*} options
 * @returns
 */

const getBookSerials = async (options) => {
  const bookSerialList = await BookSerial.findAll(options);
  return bookSerialList;
};

const getSerialByBookId = async (bookIds, whereOptions) => {
  const bookSerialList = await BookSerial.findAll({
    where: whereOptions,
    returning: true,
  });
  return bookSerialList;
};

const getBooksBySerialId = async (options) => {
  const bookSerialList = await BookSerial.findAll(options);
  return bookSerialList;
};

const createBookSerial = async (book, t) => {
  const { id } = book;
  const bookSerialInfo = await BookSerial.create({
    bookId: id, t,
  });
  return bookSerialInfo;
};

module.exports = {
  getBookSerial, createBookSerial, getSerialByBookId, getBooksBySerialId, getBookSerials,
};
