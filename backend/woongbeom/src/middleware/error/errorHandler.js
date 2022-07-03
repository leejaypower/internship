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

  ctx.status = errorStatusCode;
  ctx.body = errResponse;
};

module.exports = {
  errorHandler,
};
