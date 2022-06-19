/* eslint-disable camelcase */

import { KoreanWeatherDescription } from '@/data'
import {
  inputCelsiusUnit, inputMillimeterPerHourUnit, inputPercentUnit, inputMeterPerSecondUnit,
} from '@/services'
import dayjs from 'dayjs'

const getters = {
  simpleCurrentWeatherData(state) {
    let result = null

    const data = state.oneCallApiCurrentData

    if (data) {
      const unixTimestamp = dayjs.unix(data.dt)

      result = {
        date: unixTimestamp.format('YYYY.MM.DD'),
        day: unixTimestamp.format('dddd'),
        time: unixTimestamp.format('A hh:mm'),
        desc: KoreanWeatherDescription[data.weather[0].id],
        icon: data.weather[0].icon,
        temp: inputCelsiusUnit(data.temp),
        feels_like: inputCelsiusUnit(data.feels_like),
        humidity: inputPercentUnit(data.humidity),
        wind_speed: inputMeterPerSecondUnit(data.wind_speed),
        clouds: inputPercentUnit(data.clouds),
        rain: data.rain ? inputMillimeterPerHourUnit(data.rain['1h']) : null,
        snow: data.snow ? inputMillimeterPerHourUnit(data.snow['1h']) : null,
      }
    }

    return result
  },
  forecastDaily4DaysList(state) {
    if (state.oneCallApiDailyData.length === 0) {
      return null
    }

    const fourDaysDailyData = state.oneCallApiDailyData.slice(0, 4)

    const result = fourDaysDailyData.map((data) => {
      const unixTimestamp = dayjs.unix(data.dt)

      return ({
        key: unixTimestamp.format('DD'),
        date: unixTimestamp.format('DD(dd)'),
        icon: data.weather[0].icon,
        temp: inputCelsiusUnit(data.temp.day),
        feels_like: inputCelsiusUnit(data.feels_like.day),
        rain: data.rain ? inputMillimeterPerHourUnit(data.rain) : null,
      })
    })

    return result
  },
  forecastDaily7DaysList(state) {
    if (state.oneCallApiDailyData.length === 0) {
      return null
    }

    const result = state.oneCallApiDailyData.map((data) => {
      const unixTimestamp = dayjs.unix(data.dt)

      return ({
        key: unixTimestamp.format('DD'),
        date: unixTimestamp.format('YYYY.MM.DD'),
        day: unixTimestamp.format('DD(dd)'),
        hour: `${unixTimestamp.format('A hh')}시`,
        icon: data.weather[0].icon,
        temp: inputCelsiusUnit(data.temp.day),
        feels_like: inputCelsiusUnit(data.feels_like.day),
        rain: data.rain ? inputMillimeterPerHourUnit(data.rain) : null,
        clouds: inputPercentUnit(data.clouds),
        humidity: inputPercentUnit(data.humidity),
        uvi: `${data.uvi}`,
        wind: inputMeterPerSecondUnit(data.wind_speed),
      })
    })

    return result
  },
  simpleForecastDaily7DaysList(state) {
    if (state.oneCallApiDailyData.length === 0) {
      return null
    }

    const result = state.oneCallApiDailyData.map((data) => {
      const unixTimestamp = dayjs.unix(data.dt)

      return ({
        key: unixTimestamp.format('DD'),
        day: unixTimestamp.format('DD(dd)'),
        icon: data.weather[0].icon,
        temp: inputCelsiusUnit(data.temp.day),
      })
    })

    return result
  },
  forecastDaily7DaysTemperatureList(state) {
    return state.forecastDailyInfo.temperature
  },
  forecastDaily7DaysRainList(state) {
    return state.forecastDailyInfo.rain
  },
  forecastDaily7DaysWindList(state) {
    return state.forecastDailyInfo.wind
  },
  forecastHourlyList(state) {
    if (state.oneCallApiHourlyData.length === 0) {
      return null
    }

    const result = state.oneCallApiHourlyData.map((data) => {
      const unixTimestamp = dayjs.unix(data.dt)

      return ({
        key: unixTimestamp.format('hh'),
        date: unixTimestamp.format('YYYY.MM.DD'),
        day: unixTimestamp.format('(dd)'),
        hour: `${unixTimestamp.format('A hh')}시`,
        icon: data.weather[0].icon,
        temp: inputCelsiusUnit(data.temp),
        feels_like: inputCelsiusUnit(data.feels_like),
        rain: data.rain ? inputMillimeterPerHourUnit(data.rain['1h']) : null,
        clouds: inputPercentUnit(data.clouds),
        humidity: inputPercentUnit(data.humidity),
        uvi: `${data.uvi}`,
        wind: inputMeterPerSecondUnit(data.wind_speed),
      })
    })

    return result
  },
  forecastHourlyTemperatureList(state) {
    return state.forecastHourlyInfo.temperature
  },
  forecastHourlyRainList(state) {
    return state.forecastHourlyInfo.rain
  },
  forecastHourlyWindList(state) {
    return state.forecastHourlyInfo.wind
  },
  forecastHourlyTabList(state) {
    return state.forecastHourlyDayType
  },
  currentLocation(state) {
    return state.currentLocation
  },
  currentCoords(state) {
    return state.currentCoords
  },
  responseApiInfo(state) {
    return state.responseApiInfo
  },
  responseApiInfoMessage(state) {
    return state.responseApiInfo.text
  },
}

export default getters
