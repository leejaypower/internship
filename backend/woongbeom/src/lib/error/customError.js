const { httpStatusCodeMapping, messageMapping } = require('./errorMapping');

class CustomError extends Error {
  constructor(code, location) {
    super();

    this.code = code;
    this.statusCode = httpStatusCodeMapping[code];
    this.message = messageMapping[code];
    this.location = location;
  }
}

module.exports = {
  CustomError,
};
