import { toFixedAsFirst } from '@/utils'
import { callAirPollutionWeatherAPI, callCurrentWeatherAPI } from '@/utils/callAPI'
import { validateAirPollutionResponse, validateCurrentWeatherResponse } from '../validation'

const IDEAL_TEMPERATURE = 20 // IDEAL 온도를 20℃ 로 결정하였고, 더 더운경우와 더 추운경우로 나누어 로직설계
const highTempPenaltyMultiplier = 6.7
// 폭염경보의 기준은 35℃ 이며, 이상적온도를 20도로 세팅했을때, 35℃가 0점, 20℃가 100점이 되기위한 상수는 6.7입니다.
const lowTempPenaltyMultiplier = 2.9
// 한파경보의 기준은 -15℃ 이며 이상적온도를 20도로 세팅했을때, -15℃ 가 0점이 되고 20℃ 가 100점이 되기위한 상수는 2.9입니다.
const windPenaltyMultiplier = 7
// 강풍주의보 기준이 풍속 14m/s이기때문에 14m/s일 경우 0점, 0m/s가 100점이 나올수 있는 상수는 7입니다.
const rainPenaltyMultiplier = 50
// 호우주의보 20mm/1h이기 때문에 호우주의보에 해당하는 20mm/1h가 나오면 0점이라는 기준으로 1차방정식을 부여했습니다.
const snowPenaltyMultiplier = 5
// 대설주의보 기준 2mm/1h이기때문에 대설주의보에 해당하는 2mm/1h가 나오면 0점이라는 기준으로 1차 방정식을 짰습니다.
const airPollutionPenaltyMultiplier = 25
// 미세먼지 index의 '매우좋음'이 1 '아주나쁨'이 5이므로, 1점당 25점씩 차이를 두었습니다.

const WEIGHTED_VALUE_TEMP = 0.3
const WEIGHTED_VALUE_AIR = 0.25
const WEIGHTED_VALUE_RAIN = 0.2
const WEIGHTED_VALUE_CLOUDS = 0.15
const WEIGHTED_VALUE_WIND = 0.1
const MAX_SCORE = 100
const RGB_MAX_VALUE = 255

const calculateScore = (weatherInfo) => {
  const {
    temp, wind, rainOrSnow, air, clouds,
  } = weatherInfo
  let [tempScore, windScore, skyScore, rainOrSnowScore, airScore] = [null, null, null, null, null]
  if (temp > IDEAL_TEMPERATURE) {
    tempScore = (MAX_SCORE - (temp - IDEAL_TEMPERATURE) * highTempPenaltyMultiplier).toFixed(0)
  } else {
    tempScore = (MAX_SCORE - (IDEAL_TEMPERATURE - temp) * lowTempPenaltyMultiplier).toFixed(0)
  }

  windScore = (MAX_SCORE - wind * windPenaltyMultiplier).toFixed(0)
  skyScore = (MAX_SCORE - clouds).toFixed(0)
  // API는 구름의 비율을 0~100 단위로 주고 있습니다. 100%의 구름일 경우 하늘점수 0점, 0%의 구름일경우 하늘점수 100점이 나오도록 설계했습니다.
  if (rainOrSnow.kind === '-') {
    rainOrSnowScore = MAX_SCORE
  } else if (rainOrSnow.kind === 'snow') {
    rainOrSnowScore = (MAX_SCORE - (rainOrSnow.value * snowPenaltyMultiplier)).toFixed(0)
  } else if (rainOrSnow.kind === 'rain') {
    rainOrSnowScore = (MAX_SCORE - (rainOrSnow.value * rainPenaltyMultiplier)).toFixed(0)

    if (rainOrSnowScore < 0) {
      rainOrSnowScore = 0
    }
  }
  airScore = (MAX_SCORE - (air - 1) * airPollutionPenaltyMultiplier)

  let totalScore = Math.floor(
    // 생활에 더 밀접한 영향을 주는 더 의미있는 날씨 요소가 있기에 가중치 개념을 추가했습니다.
    // 우선은 서비스설계자인 제가 임의로 정하였지만, 향후 사용자의 개인 커스텀기능으로 확장할수있게 설계하였습니다.
    tempScore * WEIGHTED_VALUE_TEMP
  + windScore * WEIGHTED_VALUE_WIND
  + airScore * WEIGHTED_VALUE_AIR
  + skyScore * WEIGHTED_VALUE_CLOUDS
  + rainOrSnowScore * WEIGHTED_VALUE_RAIN,
  )
  if (totalScore > MAX_SCORE) {
    totalScore = MAX_SCORE
  } else if (totalScore < 0) {
    totalScore = 0
  }
  return {
    tempScore, windScore, skyScore, rainOrSnowScore, totalScore, airScore,
  }
}

const decideColor = (score) => {
  let color = null

  if (score > 70) { // 70점을 중간점수라고 기준을 정함
    // 종합점수가 100점일 경우 rgb(0,255,0)이 되도록 상수 설정
    const red = ((MAX_SCORE - score) * 10)
    const green = RGB_MAX_VALUE
    const blue = ((MAX_SCORE - score) * 10)
    color = `rgb(${red},${green},${blue})`
  } else {
    // 0점까지는 쉽게 도달할 수 없고, 시인성을 주기에 30점이면 충분히 최저점 구간에 속하는 것으로 판단
    // 30점이 될 경우 rgb(255,0,0)이 되도록 상수설정
    const red = RGB_MAX_VALUE
    const green = RGB_MAX_VALUE + ((score - 70) * 6.4)
    const blue = RGB_MAX_VALUE + ((score - 70) * 6.4)
    color = `rgb(${red},${green},${blue})`
  }
  return color
}

const AIR_CONDITION_MAP = {
  1: '매우좋음',
  2: '좋음',
  3: '보통',
  4: '나쁨',
  5: '매우나쁨',
}

const mapWeatherData = (name, [weather, air]) => {
  const airQualityIndex = air.data.list[0].main.aqi
  const weatherInfo = {
    name,
    air: airQualityIndex,
    airDescription: AIR_CONDITION_MAP[`${airQualityIndex}`],
    city: weather.data.name,
    temp: toFixedAsFirst(weather.data.main.temp),
    clouds: weather.data.clouds.all,
    wind: toFixedAsFirst(weather.data.wind.speed),
  }

  if (weather.data.rain) {
    const rainfall = weather.data.rain['1h']
    weatherInfo.rainOrSnow = {
      kind: 'rain',
      value: rainfall,
      show: `비, ${rainfall}mm/h`,
    }
  } else if (weather.data.snow) {
    const snowfall = weather.data.snow['1h']
    weatherInfo.rainOrSnow = {
      kind: 'snow',
      value: snowfall,
      show: `눈, ${snowfall}mm/h`,
    }
  } else {
    weatherInfo.rainOrSnow = {
      kind: '-',
      value: '-',
      show: '-',
    }
  }
  return weatherInfo
}

const makeWeatherInfo = async (city) => {
  const { name, lat, lon } = city
  let promiseResponses
  try {
    promiseResponses = await Promise.allSettled([
      callCurrentWeatherAPI(lat, lon),
      callAirPollutionWeatherAPI(lat, lon),
    ])
    const isRejected = promiseResponses[0].status === 'rejected' || promiseResponses[1].status === 'rejected'
    if (isRejected) {
      throw new Error()
    }
  } catch (error) {
    throw new Error(error.message) // 추후 핸들링 로직
  }

  try { // eslint-disable-next-line
    const [currentWeather, airPollution] = [promiseResponses[0].value, promiseResponses[1].value]
    validateCurrentWeatherResponse(currentWeather)
    validateAirPollutionResponse(airPollution)

    const weatherInfo = mapWeatherData(name, [currentWeather, airPollution])

    weatherInfo.score = calculateScore(weatherInfo)
    weatherInfo.fill = decideColor(weatherInfo.score.totalScore)
    return weatherInfo
  } catch (error) {
    throw new Error(error.message) // 추후 핸들링 로직
  }
}

export default makeWeatherInfo
