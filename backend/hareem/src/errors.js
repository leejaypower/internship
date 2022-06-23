class CustomError extends Error {
  constructor(statusCode, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.status = statusCode;
    this.date = new Date();
  }
}

module.exports = {
  CustomError,
};
