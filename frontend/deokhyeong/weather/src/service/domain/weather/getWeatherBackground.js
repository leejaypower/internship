/**
 * @param {Thunderstorm | Drizzle | Rain | Snow | Atmosphere | Clear | Clouds  } weatherMain
 * openWeather API에서 받아온 정보 중 Main Property 값 대소문자 구별 없음
 * @returns String
 */
const getWeatherBackground = (weatherMain) => {
  if (typeof weatherMain !== 'string') {
    return ''
  }

  const mainKey = weatherMain.toLowerCase()

  const backgroundImageMap = {
    thunderstorm: 'thunder.jpeg',
    drizzle: 'rain.jpeg', // 비오는 날씨랑 차이가 없음
    rain: 'rain.jpeg',
    snow: 'snow.jpeg',
    atmosphere: 'atmosphere.jpeg',
    clear: 'clear.jpeg',
    clouds: 'clouds.jpeg',
  }

  return `/images/background/${backgroundImageMap[mainKey]}`
}

export default getWeatherBackground
