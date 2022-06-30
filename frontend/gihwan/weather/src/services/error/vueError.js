import errorLog from '@/utils/log'

const vueError = (error, _, info) => {
  const errorInfo = { error: String(error), info }
  errorLog('vue', errorInfo)
}

export default vueError
