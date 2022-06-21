const { Op } = require('sequelize');
const { BookSerial } = require('../database/models');

const getBookSerial = async (bookId) => {
  try {
    const bookSerialList = await BookSerial.findAll({
      where: { bookId },
    });

    return bookSerialList;
  } catch (err) {
    return err.message;// 임시 error handling
  }
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
  getBookSerial, createBookSerial, getSerialByBookId, getBooksBySerialId, getBookSerials,
};
