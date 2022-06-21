import dayjs from 'dayjs'
import weatherDomain from '@/service/domain/weather'

const hourWeatherMapping = (mapTarget) => {
  const rainKey = '1h'
  const timestamp = mapTarget.dt * 1000

  return ({
    hour: dayjs(timestamp).format('HH:mm'),
    date: dayjs(timestamp).format('YYYY-MM-DD'),
    temperature: mapTarget.temp,
    windSpeed: mapTarget.wind_speed,
    weatherIcon: weatherDomain.getWeatherIconUrl(mapTarget.weather[0].icon),
    rain: mapTarget.rain ? mapTarget.rain[rainKey] : '-',
  })
}

const hourlyWeathersMapping = (mapTarget) => mapTarget.hourly.map(hourWeatherMapping)

export default hourlyWeathersMapping
