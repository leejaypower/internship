/* eslint-disable max-classes-per-file */
const { ERROR_CODE_STATUS_MAPPING } = require('./errorCode');

class CustomError extends Error {
  constructor(errorCode, message, logTitle) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.errorCode = errorCode;
    this.message = message;
    this.statusCode = ERROR_CODE_STATUS_MAPPING[errorCode];
    this.logTitle = logTitle;
  }
}

module.exports = { CustomError };
