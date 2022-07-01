const openWeatherErrorMap = (errorMessage) => {
  switch (errorMessage) {
    case 'Request failed with status code 401':
      return { title: '날씨 정보 가져오기 실패', desc: 'API키를 확인해 주세요.' }
    default:
      return { title: '통신 실패', desc: '통신 중 에러가 발생했습니다.' }
  }
}

export default openWeatherErrorMap
