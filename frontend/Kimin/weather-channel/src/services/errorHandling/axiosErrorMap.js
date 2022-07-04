import moment from 'moment'
import { getBrowserInfo } from '@/utils'
import errorCategoryMap from './errorCategoryMap'

const axiosErrorMap = (error) => {
  const { stack } = new Error()
  const browserInfo = getBrowserInfo()
  const user = localStorage.getItem('accessToken')
  const {
    name, message, code, request,
  } = error

  const [apiCall, response, responseURL, status] = error.request ? [true, request.response, request.responseURL, request.status] : [false, '-', '-', '-', '-']
  const createdAt = moment(new Date()).format('YYYYMMDD-HHmmss')
  const myErrorObj = {
    createdAt,
    user,
    name,
    browserInfo,
    stack,
    message,
    apiCall,
    response,
    responseURL,
    status,
    code,
  }

  const result = JSON.stringify(errorCategoryMap(myErrorObj))
  return result
}

export default axiosErrorMap
