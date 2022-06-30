import { GEOLOCATION_POSITION_ERROR } from '@/constants'
import dayjs from 'dayjs'
import makeLocalStorageErrorLogList from '../localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from '../localStorageLogController/saveErrorLogAtLocalStorage'

const geolocationPositionErrorHandler = (error, userInfo) => {
  const { code, message } = error

  const log = {
    type: GEOLOCATION_POSITION_ERROR,
    ...userInfo,
    code,
    message,
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  const newList = makeLocalStorageErrorLogList(log)
  saveErrorLogAtLocalStorage(JSON.stringify(newList))
}

export default geolocationPositionErrorHandler
