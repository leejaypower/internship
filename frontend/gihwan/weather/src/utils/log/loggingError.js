const logginError = (errorLog) => {
  const logs = localStorage.getItem('logs') && JSON.parse(localStorage.getItem('logs'))
  if (logs) {
    const newLogs = [...logs, errorLog]
    localStorage.setItem('logs', JSON.stringify(newLogs))
    return
  }
  localStorage.setItem('logs', JSON.stringify([errorLog]))
}

export default logginError
