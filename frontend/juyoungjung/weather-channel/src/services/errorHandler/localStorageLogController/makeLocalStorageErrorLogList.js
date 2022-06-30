import { ERROR_LOG } from '@/constants'

const makeLocalStorageErrorLogList = (log) => {
  const localStorageErrorLog = localStorage.getItem(ERROR_LOG)
  const errorLogList = JSON.parse(localStorageErrorLog)

  if (errorLogList) {
    return errorLogList.push(log)
  }

  return [log]
}

export default makeLocalStorageErrorLogList
