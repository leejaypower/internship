const {
  HTTP_STATUS_CODE, ERROR_CODE, ERROR_MESSAGE, HTTP_STATUS,
} = require('../constants');
const { CustomError } = require('../errors');
const { logger } = require('../utils');

const errorHandlerMiddleware = (isGql = false) => {
  if (isGql) {
    return (err) => {
      err.extensions.code = err.extensions.exception.code;
      err.extensions.exception.code = undefined;
      err.extensions.exception.status = undefined;

      const logData = {
        status: err.extensions.exception.status,
        code: err.extensions.exception.code,
        name: err.extensions.exception.name,
        message: err.extensions.exception.message,
        filePath: err.extensions.exception.filePath,
        function: err.extensions.exception.function,
      };

      if (logData.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        logData.msg = 'Accored unexpected error';

        logger.error(logData);
      } else {
        logData.msg = 'Accored expexted error';

        logger.info(logData);
      }

      return err;
    };
  }
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const status = err.statusCode || err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      const code = err.code || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
      const name = err instanceof CustomError ? err.name : ERROR_CODE.UNKNOWN;
      const message = err instanceof CustomError ? err.message : ERROR_MESSAGE.UNKNOWN.STANDARD;

      const error = {
        status,
        code,
        name,
        message,
      };

      ctx.status = status;

      ctx.body = { error };

      const logData = {
        ...error,
        filePath: err.filePath,
        function: err.function,
      };

      if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        logData.msg = 'Accored unexpected error';

        logger.error(logData);
      } else {
        logData.msg = 'Accored expexted error';

        logger.info(logData);
      }
    }
  };
};

module.exports = errorHandlerMiddleware;
