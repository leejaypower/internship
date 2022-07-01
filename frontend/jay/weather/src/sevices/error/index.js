import { getErrorMessage, getErrorMessageForGeolocation } from '@/util/api/errorHandling'
import { ERROR_LEVEL, ERROR_CATEGORY } from '@/lib/constants'

const MapWindowError = (message, source, line, column, error) => {
  const errorDesc = {
    category: ERROR_CATEGORY.BROWSER,
    level: ERROR_LEVEL.ERROR,
    message: '에러가 발생했습니다.',
    error: message,
    source,
    line,
    column,
    stack: error.stack,
  }
  return errorDesc
}

const MapPromiseError = (promise, reason) => {
  const errorDesc = {
    category: ERROR_CATEGORY.RUNTIME,
    level: ERROR_LEVEL.FATAL,
    message: `errorEvent: ${promise} \n
              reason: ${reason}`,
  }
  return errorDesc
}

const MapvueError = (err, vm, info) => {
  const errorDesc = {
    category: ERROR_CATEGORY.RENDER,
    level: ERROR_LEVEL.ERROR,
    message: '렌더링에 문제가 발생했습니다. 관리자에게 문의해주세요.',
    info,
    stack: err.stack,
  }
  return errorDesc
}

const createErrorDesc = (errorInfo) => {
  const code = errorInfo.errorCode

  // 사용자에게 에러 alert만 주어도 되는 경우
  if (!code) {
    const errorDesc = {
      category: ERROR_CATEGORY.API,
      level: ERROR_LEVEL.INFO,
      message: errorInfo.message,
      stack: errorInfo.stack,
    }
    return errorDesc
  }

  // 내부오류로 geolocation api가 실패한 경우
  if (code === 2) {
    const errorMessage = getErrorMessageForGeolocation(code)
    const errorDesc = {
      category: ERROR_CATEGORY.API,
      level: ERROR_LEVEL.FATAL,
      message: errorMessage,
      stack: errorInfo.error.stack,
    }
    return errorDesc
  }

  // 내부 오류를 제외한 geolocation api 에러일 경우
  if (code.toString().length === 1) {
    const errorMessage = getErrorMessageForGeolocation(code)
    const errorDesc = {
      category: ERROR_CATEGORY.API,
      level: ERROR_LEVEL.INFO,
      message: errorMessage,
      stack: errorInfo.error.stack,
    }
    return errorDesc
  }

  // 나의 custom 에러일 경우(naver reversegeocoding - 현재 위치의 지역명 결과가 없는 경우)
  if (code === 77) {
    const errorMessage = getErrorMessageForGeolocation(code)
    const errorDesc = {
      category: ERROR_CATEGORY.API,
      level: ERROR_LEVEL.WARN,
      message: errorMessage,
      stack: errorInfo.error.stack,
    }
    return errorDesc
  }

  // 런타임 에러(try/catch) 테스트용
  if (code === 1004) {
    const errorMessage = getErrorMessage(code)
    const errorDesc = {
      category: ERROR_CATEGORY.RUNTIME,
      level: ERROR_LEVEL.ERROR,
      message: errorMessage,
      stack: errorInfo.error.stack,
    }
    return errorDesc
  }

  // naver reversegeocoding api, openweathermap api 에러일 경우
  const errorMessage = getErrorMessage(code)
  const errorDesc = {
    category: ERROR_CATEGORY.API,
    level: code === 400 ? ERROR_LEVEL.ERROR : ERROR_LEVEL.FATAL,
    message: errorMessage,
    stack: errorInfo.error.stack,
  }
  return errorDesc
}

export {
  MapWindowError, MapvueError, createErrorDesc, MapPromiseError,
}
