import { WINDOW_ON_ERROR } from '@/constants'
import makeLocalStorageErrorLogList from '../localStorageLogController/makeLocalStorageErrorLogList'
import saveErrorLogAtLocalStorage from '../localStorageLogController/saveErrorLogAtLocalStorage'

/**
 *
 * @see {@link windowOnErrorHandler} Mozilla Web API GlobalEventHandlers.onerror Notes
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror}
 */

const windowOnErrorHandler = (message, source, line, column, error) => {
  const string = message.toLowerCase()
  const substring = 'script error'

  if (string.indexOf(substring) > -1) {
    return console.log('Script Error: See Browser Console for Detail')
  }

  const log = {
    type: WINDOW_ON_ERROR,
    message,
    source,
    line,
    column,
    error,
  }

  const newList = makeLocalStorageErrorLogList(log)
  saveErrorLogAtLocalStorage(JSON.stringify(newList))

  return false
}

export default windowOnErrorHandler
