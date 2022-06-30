const fetchErrorLog = (headers, body) => {
  if (!body?.log?.message) {
    const errorResponse = Promise.reject({
      status: 400,
      data: {
        message: 'BadRequest',
      },
    })
    return errorResponse
  }

  const errorLogs = JSON.parse(localStorage.getItem('errorLogs')) || []
  errorLogs.push(body.log)

  localStorage.setItem('errorLogs', JSON.stringify(errorLogs))
  const successResponse = Promise.resolve({
    status: 200,
    data: {
      message: 'Success',
    },
  })
  return successResponse
}

export default fetchErrorLog
