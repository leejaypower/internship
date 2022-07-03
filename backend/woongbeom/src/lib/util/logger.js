const logger = require('pino')();

const logServerOn = async () => {
  await logger.info('Server Running');
};

const logRequest = async (ctx, next) => {
  const message = {
    method: ctx.request.method,
    url: ctx.request.url,
  };

  await logger.info(message);
  return next();
};

const logError = async (ctx) => {
  const err = {
    code: ctx.code,
    statusCode: ctx.statusCode,
    location: ctx.location,
  };

  await logger.info(err);
};

module.exports = { logServerOn, logRequest, logError };
