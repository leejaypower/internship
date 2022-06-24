const logger = require('../../../log/config/logger');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
    logger.error(
      'Error message from the centralized error-handling component',
      err,
    );
  }
};

module.exports = errorHandler;
