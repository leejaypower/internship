const result = {
  request: {
    beforeRequestSentConfig: {
      headers: {
        Authorization: '',
        Accept: '',
      },
    },
    error: null,
  },
  response: {
    success: null,
    error: null,
  },
}

const request = {
  use: (beforeRequestSentCb, errorCb) => {
    result.request.beforeRequestSentConfig = beforeRequestSentCb(result
      .request.beforeRequestSentConfig)
    result.request.error = errorCb
  },
}

const response = {
  use: (successCb, errorCb) => {
    result.response.success = successCb
    result.response.error = errorCb
  },
}

const interceptor = {
  request,
  response,
  result,
}

export default interceptor
