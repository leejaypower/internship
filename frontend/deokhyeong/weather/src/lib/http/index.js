import axios from 'axios'
import interceptor from './interceptor'

const { requestInterceptors, responseInterceptors } = interceptor

const BARE_URL = process.env.VUE_APP_OPEN_WEATHER_BASE_UTL
const API_VERSION = process.env.VUE_APP_OPEN_WEATHER_API_VERSION

const http = axios.create({
  baseURL: `${BARE_URL}/${API_VERSION}`,
})

http.interceptors.request.use(requestInterceptors.success, requestInterceptors.fail)
http.interceptors.response.use(responseInterceptors.success, responseInterceptors.fail)

export default http
