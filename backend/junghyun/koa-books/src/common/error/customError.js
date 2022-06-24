class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    // this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
