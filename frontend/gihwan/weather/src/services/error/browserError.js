import errorLog from '@/utils/log'

const browserError = (message, source, lineno, colno, error) => {
  const errorInfo = {
    message, source, lineno, colno, error,
  }
  errorLog('browser', errorInfo)
}

export default browserError
