const getErrorMessageForGeolocation = (error) => {
  if (error.message === 1) {
    return '서비스를 위해 위치 권한을 허용해주세요.'
  }
  if (error.message === 2) {
    return '내부 오류로 위치 정보 획득에 실패했습니다.'
  }
  if (error.message === 3) {
    return '정보를 얻기 전에 지리적 위치를 획득하는 데 허용된 시간에 도달했습니다.'
  }
  return '위치 획득에 실패했습니다.'
}

const getErrorMessage = (error) => {
  if (error.response.status === 400) {
    return '잘못된 요청입니다.'
  }
  if (error.response.status === 500) {
    return '서버 오류가 발생했습니다.'
  }
  return '오류가 발생하여 데이터 획득에 실패했습니다.'
}

export { getErrorMessage, getErrorMessageForGeolocation }
