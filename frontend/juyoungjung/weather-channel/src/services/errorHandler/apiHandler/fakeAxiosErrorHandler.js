import { FAKE_AXIOS_ERROR } from '@/constants'
import dayjs from 'dayjs'
import makeLocalStorageErrorLogList from '../localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from '../localStorageLogController/saveErrorLogAtLocalStorage'

const fakeAxiosErrorHandler = (error, userInfo) => {
  const log = {
    type: FAKE_AXIOS_ERROR,
    ...userInfo,
    ...error,
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  const newList = makeLocalStorageErrorLogList(log)
  saveErrorLogAtLocalStorage(JSON.stringify(newList))
}

export default fakeAxiosErrorHandler
