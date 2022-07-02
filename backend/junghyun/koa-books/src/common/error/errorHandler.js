const logger = require('../../../log/config/logger');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const statusCode = err.statusCode || err.status || 500;
    const errorResponse = {
      statusCode,
      error: {
        errorCode: err.errorCode,
        message: err.message,
      },
    };
    ctx.status = statusCode;
    ctx.body = errorResponse;

    const logTitle = err.logTitle || '[Check the error stack]';
    if (statusCode === 500) {
      logger.error(logTitle, err);
    } else {
      logger.info(logTitle, err);
    }
  }
};

const errorHandlerGraphQL = (err) => {
  const {
    errorCode, stacktrace, logTitle,
  } = err.extensions.exception;

  const statusCode = err.extensions?.exception?.statusCode || 500;

  if (statusCode === 500) {
    logger.error(logTitle || '[Check the error stack]', err);
  } else {
    logger.info(logTitle, err);
  }

  const extensions = {
    statusCode,
    code: errorCode,
    locations: err.locations,
  };
  const errorResponse = {
    message: err.message,
    extensions,
    stack: stacktrace,
  };
  return errorResponse;
};

module.exports = { errorHandler, errorHandlerGraphQL };
