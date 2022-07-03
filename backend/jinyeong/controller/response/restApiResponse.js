const restApiResponse = (statusCode, result) => {
  const response = {
    statusCode,
    body: result,
  };

  return response;
};

module.exports = {
  restApiResponse,
};
