const lib = require('../../lib');

const { logger } = lib.util;

const errorHandler = async (ctx, err) => {
  const errorStatusCode = err.statusCode || 500;
  const errResponse = {
    errorStatusCode,
    error: {
      errorCode: err.code,
      message: err.message,
      location: err.location,
    },
  };

  await logger.logError(err);

  ctx.status = errorStatusCode;
  ctx.body = errResponse;
};

module.exports = {
  errorHandler,
};
