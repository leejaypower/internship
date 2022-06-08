import weather from '@/service/domain/weather'

const currentAirPollutionMapping = (mapTarget) => ({
  airQuality: weather.getAirPollutionStatus(mapTarget?.list[0]?.main?.aqi),
})

export default currentAirPollutionMapping
