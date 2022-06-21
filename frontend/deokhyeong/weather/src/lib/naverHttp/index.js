import axios from 'axios'
import requestInterceptors from './interceptor/requestInterceptors'
import responseInterceptors from './interceptor/responseInterceptors'

const CLIENT_ID = process.env.VUE_APP_NAVER_CLIENT_ID
const CLIENT_SECRET = process.env.VUE_APP_NAVER_CLIENT_SECRET

const naverHttp = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:8089' : 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
  },
})

naverHttp.interceptors.request.use(requestInterceptors.success, requestInterceptors.fail)
naverHttp.interceptors.response.use(responseInterceptors.success, responseInterceptors.fail)

export default naverHttp
