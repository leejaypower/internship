import commonErrorMessageMap from './commonErrorMessageMap'

const locationErrorMessageParser = (errorMessage, defaultMessage) => {
  const errorMessageMap = {
    ...commonErrorMessageMap,
    'User denied Geolocation': '위치 권한 설정이 거부되어 있습니다.',
    'unable to retrieve location': '위치 검색에 실패하였습니다.',
    'Timeout expired': '위치 검색 시간이 초과되었습니다. 잠시후 다시 시도해주세요.',
  }

  return errorMessageMap[errorMessage] || defaultMessage || '알 수 없는 오류, 관리자에게 문의 부탁드립니다.'
}

export default locationErrorMessageParser
