import commonErrorMessageMap from './commonErrorMessageMap'

const weatherErrorMessageParser = (errorMessage, defaultMessage) => {
  const errorMessageMap = {
    ...commonErrorMessageMap,
    'Nothing to geocode': '날씨 검색을 위해 위치 정보를 제공해주세요',
  }

  return errorMessageMap[errorMessage] || defaultMessage || '알 수 없는 오류, 관리자에게 문의 부탁드립니다.'
}

export default weatherErrorMessageParser
