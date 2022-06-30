const geolocationErrorMap = (erorrMessage) => {
  switch (erorrMessage) {
    case 'User denied Geolocation':
      return { title: '위치 가져오기 실패', desc: '위치 권한을 활성화 해주세요.' }
    case 'unable to retrieve location':
      return { title: '위치 가져오기 실패', desc: '위치를 검색할 수 없습니다.' }
    case 'Timeout expired':
      return { title: '위치 가져오기 실패', desc: '시간이 초과되어 위치를 가져올 수 없습니다.' }
    default:
      return { title: '위치 가져오기 실패', desc: '위치를 가져올 수 없습니다.' }
  }
}

export default geolocationErrorMap
