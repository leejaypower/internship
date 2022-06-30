import { OPEN_WEATHER_API_ERROR } from '@/constants'
import dayjs from 'dayjs'
import makeLocalStorageErrorLogList from '../localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from '../localStorageLogController/saveErrorLogAtLocalStorage'

const openWeatherMapApiErrorHandler = (error, userInfo) => {
  const {
    status, statusText, data, config,
  } = error.response
  const { cod, message } = data
  const { params, url, method } = config

  const log = {
    type: OPEN_WEATHER_API_ERROR,
    ...userInfo,
    errorCode: cod,
    message,
    requestParams: params,
    requestUrl: url,
    requestMethod: method,
    status,
    statusText,
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  const newList = makeLocalStorageErrorLogList(log)
  saveErrorLogAtLocalStorage(JSON.stringify(newList))
}

export default openWeatherMapApiErrorHandler
