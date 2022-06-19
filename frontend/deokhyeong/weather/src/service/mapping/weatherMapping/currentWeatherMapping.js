import weatherDomain from '@/service/domain/weather'

// 현재 날씨 조회 API 응답값 Mapping 함수
const currentWeatherMapping = (mapTarget) => ({
  temperature: weatherDomain.temperatureParser(mapTarget?.main?.temp),
  maxTemperature: weatherDomain.temperatureParser(mapTarget?.main?.temp_min),
  minTemperature: weatherDomain.temperatureParser(mapTarget?.main?.temp_max),
  weatherId: mapTarget?.weather[0]?.id,
  weatherSimpleNote: weatherDomain.getWeatherSimpleNote(mapTarget?.weather[0]?.id),
  weatherIcon: weatherDomain.getWeatherIconUrl(mapTarget?.weather[0]?.icon),
})

export default currentWeatherMapping
