import errorApi from '@/service/api/error'
import errorMapping from '@/service/mapping/errorMapping'

const recordBrowserError = async ({ commit }, { errorLog }) => {
  try {
    const mappedErrorLog = errorMapping.conventionMapping(errorLog)
    commit('setErrorLogs', { errorLog: mappedErrorLog })
    await errorApi.commitErrorLog({ log: mappedErrorLog })
    return errorLog
  } catch (error) {
    commit('setErrorLogs', { errorLog: error })
    return error
  }
}

const recordVueError = async ({ commit }, { errorLog }) => {
  try {
    const mappedErrorLog = errorMapping.conventionMapping(errorLog)
    commit('setErrorLogs', { errorLog: mappedErrorLog })
    await errorApi.commitErrorLog({ log: mappedErrorLog })
    return errorLog
  } catch (error) {
    commit('setErrorLogs', { errorLog: error })
    return error
  }
}

const recordApiError = async ({ commit, rootState }, { errorLog }) => {
  try {
    const mappedErrorLog = errorMapping.conventionMapping(errorLog)
    commit('setErrorLogs', { errorLog: mappedErrorLog })
    if (errorLog.status === 500) {
      const params = rootState.error.errorLogs?.length
        ? { log: { ...mappedErrorLog, apiErrorStack: rootState.error.errors } }
        : { log: mappedErrorLog }
      await errorApi.commitErrorLog(params)
      commit('clearErrorsData')
    }

    return errorLog
  } catch (error) {
    commit('setErrorLogs', { errorLog: error })
    return error
  }
}

const handleError = async ({ dispatch }, { errorLog }) => {
  try {
    if (errorLog.type === 'browser') {
      await dispatch('recordBrowserError', { errorLog })
      dispatch('alert/alertOpen', {
        message: '사용중인 브라우저 에러 발생, 고객 센터에 문의해주세요 🙏',
      }, { root: true })
    }

    if (errorLog.type === 'vue') {
      await dispatch('recordVueError', { errorLog })
      dispatch('alert/alertOpen', {
        status: errorLog.status,
        message: '정상적인 화면 불러오기 실패, 고객 센터에 문의해주세요 🙏',
      }, { root: true })
    }

    if (errorLog.type === 'api') {
      const { status, message } = await dispatch('recordApiError', { errorLog })
      dispatch('alert/alertOpen', {
        status,
        message,
      }, { root: true })
    }
  } catch (error) {
    dispatch('alert/alertOpen', {
      message: '알 수 없는 에러 발생, 고객 센터에 문의해주세요 🙏',
    }, { root: true })
  }
}

export default {
  recordVueError,
  recordApiError,
  recordBrowserError,
  handleError,
}
