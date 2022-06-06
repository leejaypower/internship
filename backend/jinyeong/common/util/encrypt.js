const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const { errorHandling } = require('./index');

const salt = Number(process.env.SALT); // salt 값
const algorithm = 'aes-256-cbc'; // 암호화 및 복호화에 사용할 알고리즘
const initVector = crypto.randomBytes(16); // 16 바이트의 랜덤 데이터 생성
const securityKey = crypto.randomBytes(32); // 시크릿 키

// 입력받은 비밀번호로 해시값을 만듭니다.(회원가입 시 활용)
const hashPassword = async (password) => {
  if (!password) {
    errorHandling.throwError(400, '비밀번호가 누락되었습니다.');
  }
  const encryptedPassword = await bcrypt.hash(password, salt);

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
  const encrypt = crypto.createCipheriv(algorithm, securityKey, initVector);

  let encryptResult = encrypt.update(message, 'utf-8', 'hex');

  encryptResult += encrypt.final('hex');

  return encryptResult;
};

// Crypto 복호화
const decipher = (encryptedData) => {
  if (!encryptedData) {
    errorHandling.throwError(400, '복호화 시킬 데이터가 누락되었습니다.');
  }
  const decrypt = crypto.createDecipheriv(algorithm, securityKey, initVector);

  let decryptedResult = decrypt.update(encryptedData, 'hex', 'utf-8');

  decryptedResult += decrypt.final('utf-8');

  return decryptedResult;
};

module.exports = {
  hashPassword,
  comparePassword,
  cipher,
  decipher,
};
