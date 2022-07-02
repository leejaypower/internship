const { GraphqlCustomError, APIError } = require('./customError');
const { logger } = require('../logger');

const errorListener = (err) => {
  const statusCode = err.statusCode || err.status || err.extensions?.exception?.statusCode || 500;

  if (statusCode === 500) {
    logger.error(err);
  } else {
    logger.warn(err); // 조금 더  구분 필요 ?
  }
};

const graphqlErrorHandler = (err) => {
  const errorObj = new GraphqlCustomError(err.extensions.code, err.message, err.path, err.locations);
  errorListener(err);
  return errorObj;
};

/**
 * 외부 라이브러리를 감싸는 함수 : Error catch를 위한 wrapper function
 * 각 라이브러리 별로 만들어 주어야 할지..이 함수가 필요한지에 대한 고민 조금 더 필요함
 * @param {Function} callback
 * @param  {...any} inputs
 */
const apiErrorWrapper = (callback, ...inputs) => {
  try {
    callback(...inputs);
  } catch (err) {
    throw new APIError(err.name, err.message, err.statusCode);
  }
};

module.exports = { errorListener, graphqlErrorHandler, apiErrorWrapper };
