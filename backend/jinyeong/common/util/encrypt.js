const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const { errorHandling } = require('./errorHandling');

const saltRounds = Number(process.env.SALT_ROUNDS);
const secretKey = process.env.SECRET_KEY;

// 입력받은 비밀번호로 해시값을 만듭니다.(회원가입 시 활용)
const hashPassword = async (password) => {
  if (!password) {
    errorHandling.throwError(400, '비밀번호가 누락되었습니다.');
  }
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  return encryptedPassword;
};

// 비밀번호 해시값과 입력받은 비밀번호 값을 비교하여 같은 지 검증합니다.(로그인 시 활용)
const comparePassword = async (password, hash) => {
  if (!password) {
    errorHandling.throwError(400, '비밀번호가 누락되었습니다.');
  }
  if (!hash) {
    errorHandling.throwError(500, '저장된 유저 비밀번호가 훼손되었습니다.');
  }
  const result = await bcrypt.compare(password, hash);

  return result;
};

// Crypto 암호화
const cipher = (message) => {
  if (!message) {
    errorHandling.throwError(400, '암호화 시킬 데이터가 누락되었습니다.');
  }

  const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  return ciphertext;
};

// Crypto 복호화
const decipher = (encryptedData) => {
  if (!encryptedData) {
    errorHandling.throwError(400, '복호화 시킬 데이터가 누락되었습니다.');
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
