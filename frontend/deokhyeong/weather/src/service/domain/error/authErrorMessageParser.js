import commonErrorMessageMap from './commonErrorMessageMap'

const authErrorMessageParser = (errorMessage, defaultMessage) => {
  const errorMessageMap = {
    ...commonErrorMessageMap,
  }

  return errorMessageMap[errorMessage] || defaultMessage || '알 수 없는 오류, 관리자에게 문의 부탁드립니다.'
}

export default authErrorMessageParser
