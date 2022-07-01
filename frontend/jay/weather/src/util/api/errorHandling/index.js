const getErrorMessageForGeolocation = (code) => {
  switch (code) {
    case 1:
      return '서비스를 위해 위치 권한을 허용해주세요.'

    case 2:
      return '내부 오류로 위치 정보 획득에 실패했습니다.'

    case 3:
      return '정보를 얻기 전에 지리적 위치를 획득하는 데 허용된 시간에 도달했습니다.'

    case 4:
      return '위치 정보를 지원하지 않는 브라우저 환경입니다.'

    case 77:
      return '현재 위치의 이름을 불러오지 못했습니다.'

    default:
      return '위치 획득에 실패했습니다.'
  }
}

const getErrorMessage = (code) => {
  switch (code) {
    case 400:
    case 404:
      return '잘못된 요청입니다. 관리자에게 문의해주세요.'

    case 500:
    case 502:
    case 503:
    case 504:
      return '서버 오류가 발생했습니다. 관리자에게 문의해주세요.'

    case 401:
    case 429:
      return '요청에 대한 권한이 없습니다. 관리자에게 문의해주세요.'

    // naver reversegeocoding 지정 에러 코드
    case 100:
      return '잘못된 요청입니다. 관리자에게 문의해주세요.'

    case 900:
      return '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.'

    default:
      return '오류가 발생하여 데이터 획득에 실패했습니다. 관리자에게 문의해주세요.'
  }
}

export { getErrorMessage, getErrorMessageForGeolocation }
