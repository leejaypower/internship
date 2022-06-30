import { ERROR_LOG } from '@/constants'

const saveErrorLogAtLocalStorage = (log) => {
  localStorage.setItem(ERROR_LOG, log)
}
export default saveErrorLogAtLocalStorage
