const collectLog = (errorLog) => {
  // errorLog에 대한 validation은 11주차 validation 리팩토링 주간에 진행하도록 하겠습니다.
  const errorLogs = JSON.parse(localStorage.getItem('errorLogs')) || []

  errorLogs.push(errorLog)
  localStorage.setItem('errorLogs', JSON.stringify(errorLogs))
}

export default collectLog
