const { errorHandler } = require('../common/util');

const { httpStatusCodeErrorMapping, messageErrorMapping } = errorHandler;

const restApiErrorResponse = (ctx, err) => {
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const errorMessage = err.inputMessage || messageErrorMapping[errorCode];
  const statusCode = httpStatusCodeErrorMapping[errorCode];

  ctx.status = statusCode;

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
