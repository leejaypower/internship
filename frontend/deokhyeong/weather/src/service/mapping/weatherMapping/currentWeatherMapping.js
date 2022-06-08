import weather from '@/service/domain/weather'

// 현재 날씨 조회 API 응답값 Mapping 함수
const currentWeatherMapping = (mapTarget) => ({
  temperature: mapTarget?.main?.temp || '-',
  maxTemperature: mapTarget?.main?.temp_min || '-',
  minTemperature: mapTarget?.main?.temp_max || '-',
  weatherId: mapTarget?.weather[0]?.id,
  weatherSimpleNote: weather.getWeatherSimpleNote(mapTarget?.weather[0]?.id),
  weatherIcon: weather.getWeatherIconUrl(mapTarget?.weather[0]?.icon),
})

export default currentWeatherMapping
