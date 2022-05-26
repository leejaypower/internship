const jwt = require('jsonwebtoken');

const sign = ({ payload, secretKey, options }) => {
  const token = jwt.sign(payload, secretKey, options);
  return token;
};
const verify = ({ token, secretKey }) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

module.exports = {
  sign,
  verify,
};
