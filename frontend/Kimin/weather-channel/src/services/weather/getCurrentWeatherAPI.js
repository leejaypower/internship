import { callCurrentWeatherAPI } from '@/utils/callAPI'
import { toFixedAsFirst } from '@/utils'

const mapRainOrSnowInformation = (weatherInfo) => {
  const isRaining = !!weatherInfo.rain
  const isSnowing = !!weatherInfo.snow

  if (isRaining) {
    const timeUnit = Object.keys(weatherInfo.rain)[0] // openWeather.org가 제공가능한 첫번째 시간단위, 1h or 3h
    const amountOfFall = `비, ${weatherInfo.rain[`${timeUnit}`]}mm/${timeUnit}` // ex) 3mm/1h
    return {
      kind: 'rain',
      timeUnit,
      amountOfFall,
    }
  }

  if (isSnowing) {
    const timeUnit = Object.keys(weatherInfo.snow)[0] // openWeather.org가 제공가능한 첫번째 시간단위, 1h or 3h
    const amountOfFall = `눈, ${weatherInfo.snow[`${timeUnit}`]}mm/${timeUnit}` // ex) 3mm/1h
    return {
      kind: 'snow',
      timeUnit,
      amountOfFall,
    }
  }

  return {
    kind: '-',
    timeUnit: '-',
    amountOfFall: '-',
  }
}

const mapCurrentWeather = (weatherInfo) => {
  const rainOrSnow = mapRainOrSnowInformation(weatherInfo)

  return {
    clouds: weatherInfo.clouds.all,
    rainOrSnow,
    wind: toFixedAsFirst(weatherInfo.wind.speed),
    temp: toFixedAsFirst(weatherInfo.main.temp),
    maxTemp: toFixedAsFirst(weatherInfo.main.temp_max),
    minTemp: toFixedAsFirst(weatherInfo.main.temp_min),
  }
}

const getCurrentWeatherAPI = async (lat, lon) => {
  try {
    const response = await callCurrentWeatherAPI(lat, lon)
    const result = mapCurrentWeather(response.data)
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

export default getCurrentWeatherAPI
