import dayDomain from '@/service/domain/day'
import dayjs from 'dayjs'
import weatherDomain from '@/service/domain/weather'

const dayWeatherMapping = (mapTarget) => {
  const timestamp = mapTarget.dt * 1000
  return ({
    dayName: mapTarget?.dt ? dayDomain.timestampToDayName(timestamp) : '정보 없음',
    date: mapTarget?.dt ? dayjs(timestamp).format('YYYY-MM-DD') : '정보 없음',
    maxTemperature: weatherDomain.temperatureParser(mapTarget?.temp?.max),
    minTemperature: weatherDomain.temperatureParser(mapTarget?.temp?.min),
    weatherIcon: weatherDomain.getWeatherIconUrl(mapTarget?.weather[0]?.icon),
  })
}

const oneWeekWeathersMapping = (mapTarget) => mapTarget.daily.map(dayWeatherMapping)

export default oneWeekWeathersMapping
