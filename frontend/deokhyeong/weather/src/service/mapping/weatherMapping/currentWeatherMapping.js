import weatherDomain from '@/service/domain/weather'
import dayjs from 'dayjs'

// 현재 날씨 조회 API 응답값 Mapping 함수
const currentWeatherMapping = (mapTarget) => ({
  date: mapTarget?.dt ? dayjs(mapTarget.dt * 1000).format('YYYY-MM-DD') : '정보 없음',
  temperature: weatherDomain.temperatureParser(mapTarget?.main?.temp),
  maxTemperature: weatherDomain.temperatureParser(mapTarget?.main?.temp_max),
  minTemperature: weatherDomain.temperatureParser(mapTarget?.main?.temp_min),
  weatherId: mapTarget?.weather[0]?.id,
  weatherSimpleNote: weatherDomain.getWeatherSimpleNote(mapTarget?.weather[0]?.id),
  weatherIcon: weatherDomain.getWeatherIconUrl(mapTarget?.weather[0]?.icon),
})

export default currentWeatherMapping
