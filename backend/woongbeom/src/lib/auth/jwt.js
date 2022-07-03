const jwt = require('jsonwebtoken');

const sign = async (payload, expiresIn) => jwt.sign(payload, process.env.SECRET_KEY, expiresIn);

const verify = async (token) => {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  return result;
};

module.exports = { sign, verify };
