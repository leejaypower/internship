const jwt = require('jsonwebtoken');

const issue = async (payload, expiresIn) => jwt.sign(payload, process.env.SECRET_KEY, expiresIn);

const verify = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw err.message;
  }
};

module.exports = { issue, verify };
