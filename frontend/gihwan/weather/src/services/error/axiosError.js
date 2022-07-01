import axios from 'axios'
import errorLog from '@/utils/log'

const axiosError = () => {
  axios.interceptors.response.use((response) => response, (error) => {
    const errorInfo = { ...error }
    errorLog('fetch', errorInfo)
  })
}

export default axiosError
