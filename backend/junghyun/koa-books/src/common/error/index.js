const { errorHandler, errorHandlerGraphQL } = require('./errorHandler');
const { CustomError } = require('./customError');
const { ERROR_CODE } = require('./errorCode');

module.exports = {
  errorHandler,
  errorHandlerGraphQL,
  CustomError,
  ERROR_CODE,
};
