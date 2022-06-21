import { callCurrentWeatherAPI } from '@/utils/callAPI'
import { toFixedAsFirst } from '@/utils'

const mapRainOrSnowInformation = (weatherInfo) => {
  const isRaining = !!weatherInfo.rain
  const isSnowing = !!weatherInfo.snow

  if (isRaining) {
    return {
      kind: 'rain',
      timeUnit: weatherInfo.rain[0], // openWeather.org가 제공가능한 첫번째 시간단위, 1h or 3h
      amountOfFall: `비, ${weatherInfo.rain[`${this.timeUnit}`]}mm/${this.timeUnit}`, // ex) 3mm/1h
    }
  }

  if (isSnowing) {
    return {
      kind: 'snow',
      timeUnit: weatherInfo.snow[0], // openWeather.org가 제공가능한 첫번째 시간단위, 1h or 3h
      amountOfFall: `눈, ${weatherInfo.snow[`${this.timeUnit}`]}mm/${this.timeUnit}`, // ex) 3mm/1h
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
