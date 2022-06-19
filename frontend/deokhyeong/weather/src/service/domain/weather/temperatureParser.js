/**
 *
 * @param {string | number} _temperature
 * 문자열 스트링은 숫자 형태만 가능합니다.
 */
const temperatureParser = (_temperature) => {
  const temperature = Number(_temperature)
  if (Number.isNaN(temperature)) {
    return '날씨 정보 없음'
  }
  if (temperature < -50 || temperature > 60) {
    // 한반도 역대 최저 기온은 -32.6 도 입니다.
    // 한반도 역대 최고 기온은 41도 입니다.
    return '기상청 확인 권장'
  }
  return temperature
}

export default temperatureParser
