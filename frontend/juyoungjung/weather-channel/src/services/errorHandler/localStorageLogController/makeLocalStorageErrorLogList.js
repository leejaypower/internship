import { ERROR_LOG } from '@/constants'

const makeLocalStorageErrorLogList = (log) => {
  const localStorageErrorLog = localStorage.getItem(ERROR_LOG)
  const errorLogList = JSON.parse(localStorageErrorLog)

  if (errorLogList) {
    errorLogList.push(log)

    return errorLogList
  }

  return [log]
}

export default makeLocalStorageErrorLogList
