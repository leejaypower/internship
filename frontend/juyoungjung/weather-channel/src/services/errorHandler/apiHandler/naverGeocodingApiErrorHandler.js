import { NAVER_GEOCODING_API_ERROR } from '@/constants'
import dayjs from 'dayjs'
import makeLocalStorageErrorLogList from '../localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from '../localStorageLogController/saveErrorLogAtLocalStorage'

const naverGeocodingApiErrorHandler = (error, userInfo) => {
  if (!error.response) {
    return
  }

  const {
    status, statusText, data, config,
  } = error.response
  const { code, message, name } = data.status
  const { params, url, method } = config

  const log = {
    type: NAVER_GEOCODING_API_ERROR,
    ...userInfo,
    errorCode: code,
    message,
    name,
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

export default naverGeocodingApiErrorHandler
