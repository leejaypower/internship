const errorHandler = (errCode, errMessage) => {
  const err = new Error(errMessage);
  err.name = errCode;
  throw err;
};

module.exports = {
  errorHandler,
};
