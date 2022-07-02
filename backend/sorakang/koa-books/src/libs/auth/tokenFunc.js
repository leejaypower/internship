const { sign } = require('jsonwebtoken');
const { customError } = require('../error');

const getToken = (payload, secretKey, exp) => {
  const token = sign(
    payload,
    secretKey,
    { expiresIn: exp },
  );
  return token;
};

module.exports = { getToken };
