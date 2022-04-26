const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config.development.secret, {
      expiresIn,
    });
  },
  verify(token) {
    try {
      return jwt.verify(token, config.development.secret);
    } catch (err) {
      throw err;
    }
  },
};
