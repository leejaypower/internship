import { WINDOW_ON_UNHANDLED_REJECTION } from '@/constants'
import dayjs from 'dayjs'
import makeLocalStorageErrorLogList from '../localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from '../localStorageLogController/saveErrorLogAtLocalStorage'

const windowOnUnhandledRejectionHandler = (errorEvent) => {
  const {
    code, config, message, name, status,
  } = errorEvent.reason

  const log = {
    type: WINDOW_ON_UNHANDLED_REJECTION,
    code,
    requestParams: config?.params,
    requestUrl: config?.url,
    requestMethod: config?.method,
    message,
    name,
    status,
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  const newList = makeLocalStorageErrorLogList(log)
  saveErrorLogAtLocalStorage(JSON.stringify(newList))
}

export default windowOnUnhandledRejectionHandler
