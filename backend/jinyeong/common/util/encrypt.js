const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const constants = require('../constants');
const { CustomError } = require('./errorHandler');

const { ERROR_CODE } = constants;

const saltRounds = Number(process.env.SALT_ROUNDS);
const secretKey = process.env.SECRET_KEY;

// 입력받은 비밀번호로 해시값을 만듭니다.(회원가입 시 활용)
const hashPassword = async (password) => {
  if (!password) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  return encryptedPassword;
};

// 비밀번호 해시값과 입력받은 비밀번호 값을 비교하여 같은 지 검증합니다.(로그인 시 활용)
const comparePassword = async (password, hash) => {
  if (!password) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
  if (!hash) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
  console.log('check!!');
  const result = await bcrypt.compare(password, hash);

  return result;
};

// Crypto 암호화
const cipher = (message) => {
  if (!message) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  return ciphertext;
};

// Crypto 복호화
const decipher = (encryptedData) => {
  if (!encryptedData) {
    throw new CustomError(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }

  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);

  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  hashPassword,
  comparePassword,
  cipher,
  decipher,
};
