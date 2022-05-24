const throwError = (errCode, errMessage) => {
  const err = new Error(errMessage);
  err.name = errCode;
  throw err;
};

module.exports = {
  throwError,
};
