import moment from 'moment'
import { getBrowserInfo } from '@/utils'
import errorCategoryMap from './errorCategoryMap'

const customErrorMaker = ({
  errorName, message, requestInfo, stack,
}) => {
  const browserInfo = getBrowserInfo()
  const user = localStorage.getItem('accessToken')
  const createdAt = moment(new Date()).format('YYYYMMDD-HHmmss')
  const apiCall = !!requestInfo

  const newErrorObj = {
    createdAt,
    browserInfo,
    user,
    message,
    name: errorName,
    apiCall,
    response: requestInfo?.request?.response,
    responseURL: requestInfo?.request?.responseURL,
    status: requestInfo?.request?.status,
    code: requestInfo?.statusText,
    stack,
  }

  const errorResult = errorCategoryMap(newErrorObj)
  return errorResult
}

export default customErrorMaker
