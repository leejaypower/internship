const collectLog = (errorLog) => {
  const { category, level } = errorLog
  if (!category || !level) {
    return
  }

  const errorLogs = JSON.parse(localStorage.getItem('errorLogs')) || []

  errorLogs.push(errorLog)
  localStorage.setItem('errorLogs', JSON.stringify(errorLogs))
}

export default collectLog
