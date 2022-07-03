const { errorHandler } = require('../common/util');

const { httpStatusCodeErrorMapping, messageErrorMapping } = errorHandler;

const restApiErrorResponse = (ctx, err) => {
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const errorMessage = err.inputMessage || messageErrorMapping[errorCode];
  const statusCode = httpStatusCodeErrorMapping[errorCode];

  const errorStack = err.stack;

  ctx.status = statusCode;

  let logLevel = 'INFO';
  if (statusCode >= 500) {
    logLevel = 'ERROR';
  }

  let logFormat = `[${logLevel}][${new Date()}] message: "${err.message || errorMessage}"`;
  if (statusCode >= 500) {
    logFormat = logFormat.concat(` 
    ======> stack: ${errorStack}>`);
  }
  console.log(logFormat);

  ctx.body = {
    statusCode,
    error: {
      code: errorCode,
      message: errorMessage,
      originMessage: err.message || null,
    },
  };
};

const graphqlApiErrorResponse = (err) => {
  const errorCode = err.extensions.exception.code || err.extensions.code;
  const errorMessage = err.inputMessage || messageErrorMapping[errorCode];
  const statusCode = httpStatusCodeErrorMapping[errorCode];

  const errorStack = err.extensions.exception.stacktrace;
  const errorPath = err.path;

  let logLevel = 'INFO';
  if (statusCode >= 500) {
    logLevel = 'ERROR';
  }

  let logFormat = `[${logLevel}][${new Date()}][PATH: ${errorPath || 'SCHEMA_CONSTRAINT'}] message: "${err.message || errorMessage}"`;
  if (statusCode >= 500) {
    logFormat = logFormat.concat(` 
    ======> path: ${errorPath}
    ======> stack: ${errorStack}`);
  }

  console.log(logFormat);

  const response = {
    message: errorMessage,
    extensions: {
      code: errorCode,
      statusCode,
      originMessage: err.message,
    },
  };

  return response;
};

module.exports = {
  restApiErrorResponse,
  graphqlApiErrorResponse,
};
