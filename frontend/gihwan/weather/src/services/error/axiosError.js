import axios from 'axios'
import errorLog from '@/utils/log'

const axiosErorr = () => {
  axios.interceptors.response.use((response) => response, (error) => {
    const errorInfo = { ...error }
    errorLog('fetch', errorInfo)
  })
}

export default axiosErorr
