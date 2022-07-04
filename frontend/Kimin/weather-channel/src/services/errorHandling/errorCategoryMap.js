import { deepClone } from '@/utils'

const errorCategoryMap = (customErrorObj) => {
  let mappedInfo

  const wrongCoordinate = customErrorObj?.responseURL?.indexOf('openweathermap') > -1
  && (customErrorObj?.response?.indexOf('wrong latitude') > -1
  || customErrorObj?.response?.indexOf('wrong longitude') > -1)

  const invalidQuery = customErrorObj?.message === 'Invalid Query'
  && customErrorObj?.name === 'customError_naverGeoCode'

  const insufficientResponse = customErrorObj?.message === 'Insufficient Response'

  const invalidCoordinates = customErrorObj?.message === 'Invalid Coordinates'

  const navigatorError = customErrorObj?.message === 'Navigator Error'

  const uncaughtWindowError = customErrorObj?.name === 'UNCAGHT_WINDOW_ERORR'

  const uncaughtVueError = customErrorObj.name === 'UNCAUGHT_VUE_ERROR'

  if (wrongCoordinate) {
    mappedInfo = {
      name: 'WRONG_COORDINATES',
      level: 'WARN',
      alertMessage: '날씨확인에 필요한 좌표설정에 문제가 있습니다.',
    }
  }

  if (invalidQuery) {
    mappedInfo = {
      name: 'WRONG_ADRESS_SEARCHED',
      level: 'NOTICE',
      alertMessage: '주소검색어의 수정이 필요합니다.',
    }
  }

  if (insufficientResponse) {
    mappedInfo = {
      name: 'INSUFFICIENT_OPENWEATHER_RESPONSE',
      level: 'CRITICAL',
      alertMessage: '날씨서버에 문제가 있습니다. 고객센터에 문의바랍니다.',
    }
  }

  if (invalidCoordinates) {
    mappedInfo = {
      name: 'NO COORDINATES',
      level: 'NOTICE',
      alertMessage: '현 위치에 대한 좌표세팅을 기다리고 있습니다.',
    }
  }

  if (navigatorError) {
    mappedInfo = {
      name: 'Navigator Error',
      level: 'NOTICE',
      alertMessage: '좌표확인을 위한 브라우저 권한을 확인바랍니다.',
    }
  }

  if (uncaughtVueError) {
    mappedInfo = {
      level: 'WARN',
      alertMessage: '알 수 없는 에러가 발생했습니다. 고객센터에 문의바랍니다.',
    }
  }

  if (uncaughtWindowError) {
    mappedInfo = {
      level: 'WARN',
      alertMessage: '알 수 없는 에러가 발생했습니다. 고객센터에 문의바랍니다.',
    }
  }

  const finalObject = deepClone(Object.assign(customErrorObj, mappedInfo))

  return finalObject
}

export default errorCategoryMap
