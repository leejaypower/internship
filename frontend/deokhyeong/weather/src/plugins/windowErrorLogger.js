const windowErrorLogger = (message, url, lineNo, columnNo, error, store) => {
  const errorLog = {
    type: 'browser',
    name: error.name,
    message,
    stack: error.stack,
    uri: url,
    lineNo,
    columnNo,
  }

  store.dispatch(
    'error/handleError',
    { errorLog },
  )

  return true
}

export default windowErrorLogger
