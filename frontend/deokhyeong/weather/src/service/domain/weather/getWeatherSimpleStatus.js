import weatherDescriptions from '@/constants/weatherDescriptions'

const getWeatherSimpleNote = (weatherId) => {
  if (!weatherId) {
    return '날씨 상태 정보 없음'
  }
  const weather = weatherDescriptions.find((weatherDescription) => weatherDescription[weatherId])
  return weather[weatherId]
}

export default getWeatherSimpleNote
