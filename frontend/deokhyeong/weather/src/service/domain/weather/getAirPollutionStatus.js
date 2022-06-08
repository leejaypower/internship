const getAirPollutionStatus = (airQualityIndex) => {
  if (!airQualityIndex) {
    return '미세 먼지 정보 없음 🤔'
  }

  const airPollutionMap = {
    1: '매우 좋음 😄',
    2: '좋음 😀',
    3: '보통 🙂',
    4: '나쁨 😕',
    5: '매우 나쁨 😩',
  }

  return airPollutionMap[airQualityIndex]
}

export default getAirPollutionStatus
